# PowerWise Australia

PowerWise Australia is a three-page demonstration website for Lab 0.2. It introduces household appliance energy consumption in the Australian market and demonstrates HTML, CSS and JavaScript.

## Pages

- **Home:** Introduction to appliance energy awareness.
- **Televisions:** Television efficiency tips and an interactive annual running-cost calculator.
- **About Us:** Project purpose and a summary of the technologies used.

## Run the website

Open `index.html` in a browser, or serve the folder with a local web server:

```powershell
python -m http.server 8000
```

Then visit `http://localhost:8000`.

## JavaScript features

- Page navigation with an animated transition.
- Automatic current-page highlighting in the navigation menu.
- Responsive mobile navigation menu.
- Automatic footer year.
- Scroll-based content reveal effects.
- Television annual energy and cost calculator.
- Responsive television data visualisations with accessible descriptions.

## Generative AI use and reflection

I used OpenAI Codex, a generative AI coding assistant, to help plan and create the initial HTML structure, CSS styling and JavaScript interactions. I prompted it with the assessment requirements and asked it to build a responsive three-page website about appliance energy consumption. I then reviewed the generated files, checked that the navigation and calculator logic matched the requirements, and retained responsibility for the final work.

The assistant was useful for quickly creating a consistent layout across three pages and suggesting accessibility features such as semantic landmarks, `aria-current`, form labels and a skip link. It also helped connect the calculation formula to the form fields. A limitation is that generated code still needs careful checking: content may be too generic, assumptions such as the displayed name must be confirmed, and visual choices may need adjustment to suit the supplied branding. I should be able to explain the page structure, CSS selectors, event listeners and running-cost formula before demonstrating the project.

> Note: The assessment brief refers to GitHub Copilot. This repository records the GenAI tool actually used—OpenAI Codex—rather than claiming use of a different tool.

## Acknowledgement

Code and placeholder content were created with assistance from OpenAI Codex (Generative AI). Appliance figures produced by the calculator are illustrative estimates and actual energy use and tariffs vary.
