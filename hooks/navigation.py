import json
from pathlib import Path

from jinja2 import Environment, FileSystemLoader, StrictUndefined
from mkdocs.plugins import event_priority


TEMPLATES = Environment(
    loader=FileSystemLoader(Path(__file__).resolve().parents[1] / "overrides" / "partials"),
    autoescape=True,
    trim_blocks=True,
    lstrip_blocks=True,
    undefined=StrictUndefined,
)


# Render before the statistics plugin counts the page's words.
@event_priority(50)
def on_page_markdown(markdown, *, page, **kwargs):
    if page.file.src_uri != "Navigation/navigation.md":
        return

    data_file = Path(page.file.abs_src_path).with_name("sites.json")
    categories = json.loads(data_file.read_text(encoding="utf-8"))
    navigation = TEMPLATES.get_template("navigation.html").render(categories=categories)
    return f"{markdown}\n\n{navigation}"
