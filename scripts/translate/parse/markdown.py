"""Splits a Markdown/MDX doc file into translatable and non-translatable blocks.

[Front matter]
values for `title`/`description`/`summary` are translatable,
everything else (keys, other fields, formatting) is not.

[Markdown body]
Code blocks/spans, HTML/JSX tags, Markdown syntax characters 
(heading `#`s, list markers, emphasis, table pipes/delimiters), 
and link/image URLs are all treated as non-translatable.
"""
import html
import re

def parse_markdown(content):
    """Main function: Parses Markdown content into translatable and non-translatable blocks.

    Args:
        content (str): The content of the Markdown file.

    Returns:
        list: A list of dictionaries in the format {"content": str, "shouldTranslate": bool}.
    """
    blocks = []

    # Step 1: Split Front Matter and Markdown Body
    fm_raw, markdown_body = _extract_front_matter(content)

    # Step 2: Parse Front Matter (if exists)
    blocks.extend(_parse_front_matter_block(fm_raw))

    # Step 3: Parse Markdown Body
    if markdown_body:
        blocks.extend(_parse_markdown_body(markdown_body))

    return blocks


def _append_block(blocks, text, should_translate):
    """Appends a block, automatically merging consecutive 'shouldTranslate: False' items."""
    if not text:
        return

    if blocks and not should_translate and not blocks[-1]["shouldTranslate"]:
        blocks[-1]["text"] += text
    else:
        blocks.append({"text": text, "shouldTranslate": should_translate})


def _extract_front_matter(content):
    """Step 1: Splits content into Front Matter and Markdown body."""
    front_matter_pattern = re.compile(
        r"^---\n([\s\S]*?)\n---\n?", re.MULTILINE
    )
    match = front_matter_pattern.match(content)
    if match:
        fm_raw = match.group(0)
        markdown_body = content[match.end() :]
        return fm_raw, markdown_body
    return None, content


def _parse_front_matter_block(fm_text):
    """Step 2: Processes Front Matter and extracts translatable values (e.g., title)."""
    key_value_pattern = re.compile(
        r"(^\s*(?:title|description|summary):\s*)([^\n]+)(\n?)",
        re.MULTILINE | re.IGNORECASE,
    )
    blocks = []
    last_index = 0

    for match in key_value_pattern.finditer(fm_text):
        start, end = match.span()

        # Non-translatable content before key-value pair
        if start > last_index:
            _append_block(blocks, fm_text[last_index:start], False)

        key_part = match.group(1)
        value_part = match.group(2)
        newline_part = match.group(3)

        # Key (e.g., "title: ")
        _append_block(blocks, key_part, False)

        # Value with whitespace separated
        stripped_val = value_part.strip()
        if stripped_val:
            leading_len = len(value_part) - len(value_part.lstrip())
            trailing_len = len(value_part) - len(value_part.rstrip())

            leading_ws = value_part[:leading_len]
            trailing_ws = (
                value_part[len(value_part) - trailing_len :]
                if trailing_len > 0
                else ""
            )

            if leading_ws:
                _append_block(blocks, leading_ws, False)
            _append_block(blocks, stripped_val, True)
            if trailing_ws:
                _append_block(blocks, trailing_ws, False)
        else:
            _append_block(blocks, value_part, False)

        # Newline
        if newline_part:
            _append_block(blocks, newline_part, False)

        last_index = end

    # Remaining non-translatable content
    if last_index < len(fm_text):
        _append_block(blocks, fm_text[last_index:], False)

    return blocks


def _parse_markdown_body(body_text):
    """Step 3: Splits Markdown body into syntax tokens, HTML tags, and translatable text."""
    markdown_element_pattern = re.compile(
        r"(```[\s\S]*?```)|"  # Code blocks
        r"(`[^`]+`)|"  # Inline code
        r"(<[^>]+>)|"  # HTML/JSX tags
        r"(!?\[.*?\]\(.*?\))|"  # Links and images
        r"(^\s*#{1,6}\s*)|"  # Heading symbols
        r"(^\s*[-*+]\s+)|"  # Unordered list markers
        r"(^\s*\d+\.\s+)|"  # Ordered list markers
        r"(^\s*>\s+)|"  # Blockquote markers
        r"(\*{1,3}|_{1,3}|~~)|"  # Bold, italic, strikethrough syntax
        r"(^\s*\|?[\s:-]*---[\s:-]*\|[|\s:-]*$)|"  # Table delimiter rows
        r"(\|)|"  # Table pipe separators
        r"(\n+)",  # Newlines
        re.MULTILINE,
    )
    link_image_pattern = re.compile(r"(!?)\[(.*?)\]\((.*?)\)")

    blocks = []
    last_index = 0

    def _add_text_block(text):
        """Helper: Appends text, isolating whitespace as non-translatable."""
        if not text:
            return

        stripped = text.strip()
        if not stripped:
            _append_block(blocks, text, False)
            return

        leading_len = len(text) - len(text.lstrip())
        trailing_len = len(text) - len(text.rstrip())

        leading_ws = text[:leading_len]
        trailing_ws = (
            text[len(text) - trailing_len :] if trailing_len > 0 else ""
        )
        core_text = (
            text[leading_len : len(text) - trailing_len]
            if trailing_len > 0
            else text[leading_len:]
        )

        if leading_ws:
            _append_block(blocks, leading_ws, False)
        if core_text:
            _append_block(blocks, core_text, True)
        if trailing_ws:
            _append_block(blocks, trailing_ws, False)

    for match in markdown_element_pattern.finditer(body_text):
        start, end = match.span()

        # Plain text before matched syntax
        if start > last_index:
            text_part = body_text[last_index:start]
            _add_text_block(text_part)

        matched_text = match.group(0)

        # Special handling for Links and Images
        link_match = link_image_pattern.fullmatch(matched_text)
        if link_match:
            is_image = link_match.group(1) == "!"
            text_to_translate = link_match.group(2)
            url_part = f"({link_match.group(3)})"

            if is_image:
                _append_block(blocks, "!", False)

            _append_block(blocks, "[", False)
            _add_text_block(text_to_translate)
            _append_block(blocks, "]", False)
            _append_block(blocks, url_part, False)
        else:
            # Markdown symbols, HTML tags, and newlines
            _append_block(blocks, matched_text, False)

        last_index = end

    # Remaining text after last match
    if last_index < len(body_text):
        _add_text_block(body_text[last_index:])

    return blocks


def unescape_for_markdown(text):
    return html.unescape(text)
