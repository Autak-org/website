"""Discover editorial Markdown files under editorial/."""

from pathlib import Path

EDITORIAL_ROOT = Path("editorial")


def list_editorial_files(target: str) -> list[Path]:
    """Resolve CLI `target` to one or more editorial .md paths.

    Args:
        target: `all`, a path under editorial/, or a path relative to editorial/.
    """
    if target == "all":
        return _walk(EDITORIAL_ROOT)

    path = Path(target)
    if not path.is_absolute():
        # Accept both `editorial/news/x.md` and `news/x.md`
        candidates = [path, EDITORIAL_ROOT / path]
    else:
        candidates = [path]

    for candidate in candidates:
        if candidate.is_file() and candidate.suffix == ".md":
            if candidate.name.startswith("_"):
                raise SystemExit(
                    f"[Error] Template/private files are skipped: {candidate}"
                )
            return [candidate]
        if candidate.is_dir():
            return _walk(candidate)

    raise SystemExit(
        f"[Error] Target not found under editorial/: '{target}'"
    )


def _walk(root: Path) -> list[Path]:
    if not root.exists():
        raise SystemExit(f"[Error] Folder not found: {root}")

    files: list[Path] = []
    for path in sorted(root.rglob("*.md")):
        if any(part.startswith("_") for part in path.parts):
            continue
        if path.name.startswith("_"):
            continue
        files.append(path)
    return files
