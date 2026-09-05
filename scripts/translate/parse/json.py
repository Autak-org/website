"""Splits a JSON UI-texts file into translatable and non-translatable blocks

Only the string *values* of top-level "key": "value" pairs are ever translated

Within a value, any `{placeholder}` token 
(used for runtime string interpolation, e.g. a patient's name) 
is swapped out for an opaque `<phN/>` tag before translation and restored afterwards.
"""
import html
import re

def parse_json(content):
    """Parses a JSON string into an ordered list of translatable/non-translatable blocks.

    Args:
        content (str): The raw contents of the JSON file.

    Returns:
        tuple[list[dict], dict]: 
            - parsed_blocks[list[dict]]
                : The list of {"text": str, "shouldTranslate":bool} blocks 
                    (see _append_block) 
            - placeholder_table[dict[str, str]]
                : A mapping from each "<phN/>" tag 
                    to the original "{placeholder}" text it replaced 
                    (consumed later by unescape_for_json).
    """
    blocks = []
    placeholder_table = {}
    
    # Group 1: "key": " (from the key name to the starting double quote of the value)
    # Group 2: The value content (escaped characters or non-quote characters)
    # Group 3: " (the ending double quote of the value)
    pattern = re.compile(r'(\s*"(?:\\.|[^"\\])*"\s*:\s*")((?:\\.|[^"\\])*?)(")')
    
    last_index = 0
    for match in pattern.finditer(content):
        # 1. Non-translatable part (from the end of the last match to the start of the current value)
        pre_text = content[last_index:match.end(1)]
        _append_block(blocks, pre_text, False)
        
        # 2. Translatable part (the actual value content)
        value = match.group(2).replace(r'\"', '"')
        
        # Local function to replace {xxx} with <phX/> and record it in the lookup table
        def replace_ph(m):
            ph_tag = f"<ph{len(placeholder_table) + 1}/>"
            placeholder_table[ph_tag] = m.group(0)
            return ph_tag
        
        # Replace all placeholders in the value and add it as a translatable block
        value_with_ph = re.sub(r"\{[^{}]+\}", replace_ph, value)
        _append_block(blocks, value_with_ph, True)
        
        # Update the last index to the end of the value (right before the closing quote)
        last_index = match.end(2)
        
    # Add any remaining text (like the final closing quotes or brackets)
    _append_block(blocks, content[last_index:], False)
    
    return blocks, placeholder_table


def _append_block(blocks, text, should_translate):
    """Appends a block to the list, merging consecutive non-translatable blocks to keep the list compact.
    
    The reason for merging is to avoid sending the translation engine a flood of tiny fragments, 
    which can be inefficient and may lead to context loss.
    """
    if not text:
        return
    # Merge with the previous block if they share the same shouldTranslate flag
    if blocks and blocks[-1]["shouldTranslate"] == should_translate:
        blocks[-1]["text"] += text
    else:
        blocks.append({"text": text, "shouldTranslate": should_translate})


def unescape_for_json(text, placeholder_table):
    """Reverses parse_json()'s transformations on a translated value

    1. Restore "{placeholder}" tokens from their "<phN/>" stand-ins
    2. Decode any HTML entities the translation engine may have introduced 
        (e.g. some translation providers HTML-escape quotes/ampersands in their output)
    3. Re-escapes double quotes so the result is valid inside a JSON string.

    Args:
        text (str): The translated value text.
        placeholder_table (dict): The mapping produced by parse_json(),
            used to restore the original placeholder tokens.

    Returns:
        str: The value text, ready to be written directly 
            between the surrounding quotes of the target JSON file.
    """
    text = _restore_placeholders(text, placeholder_table)
    text = html.unescape(text)
    return text.replace('"', r'\"')


def _restore_placeholders(translated_text, placeholder_table):
    """Restores original placeholder tokens ({x}) from <phX/> tags
    using the provided placeholder lookup table in a single pass.
    """
    return re.sub(
        r"<ph(\d+)\s*/>",
        lambda m: placeholder_table.get(f"<ph{m.group(1)}/>", m.group(0)),
        translated_text
    )
