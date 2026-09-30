# Website code: every line explained

This guide follows the current source files in their original order. Each entry shows the exact source line and what it does. It covers all three HTML pages, the shared CSS, and the shared JavaScript. Source files were not changed.

## How to read the code

- HTML creates content and structure; CSS selects elements and controls appearance; JavaScript reacts to events and updates the document.
- A class can be shared by many elements. An id identifies one element. Classes do nothing visually until a CSS rule or script uses them.
- CSS `.name` matches a class; `#name` matches an id; spaces match descendants; `>` matches direct children; commas separate alternative selectors.
- CSS `:hover` and `:focus` match interaction states; `:first-child`, `:last-child`, and `:nth-child(n)` match sibling positions; `:not(...)` excludes a match. `*` matches every element; `::before` and `::after` select pseudo-elements.
- CSS rules combine through the cascade. Within comparable rules, later declarations can override earlier ones. Media queries activate rules only under their stated conditions.
- `px` means CSS pixels; `rem` uses the root font size; `em` uses the relevant font size; `vw` is 1% of viewport width; `fr` shares grid space. `ms` means milliseconds and `s` means seconds.
- CSS `rgba(...)` includes an alpha/transparency value. Names like `--green` are labels: this project currently uses warm brown and orange values.
- HTML closing tags finish an element. JavaScript braces group code or object properties; parentheses contain arguments or conditions. Blank lines improve source readability and do not create visible blank rows.

## Contents

- [index.html](#indexhtml)
- [televisions.html](#televisionshtml)
- [about.html](#abouthtml)
- [styles.css](#stylescss)
- [script.js](#scriptjs)

## Important details in this version

- Home has font preconnect links but no Google Fonts stylesheet link. It can use fallback fonts while the other pages load DM Sans and Manrope.
- Most .reveal content remains transparent if JavaScript does not run, unless reduced-motion CSS makes it visible.
- The chart graphics are PNG images, not JavaScript-generated or interactive charts.
- The initial calculator answer is written in HTML. JavaScript recalculates it on submit, not continuously while typing.
- Example: 120 W / 1000 x 4 hours/day x 365 = 175.2 kWh/year; 175.2 x (35 cents / 100) = AUD 61.32/year. The visible formula assumes tariff is in dollars; the input is in cents, so JavaScript divides by 100.
- Reduced-motion CSS shortens visual effects but does not remove the JavaScript navigation timeout.

## Demonstration: how the files work together

1. The browser parses an HTML page and fetches styles.css and script.js.
2. CSS lays out the content and chooses desktop or mobile rules based on viewport width.
3. After parsing, JavaScript sets up navigation, menu clicks, year updates, the reveal observer, and the calculator when present.
4. Clicking the mobile menu changes aria-expanded and the is-open class; CSS then shows or hides the links.
5. Submitting valid calculator values reads the fields, computes energy and cost, and replaces the result text without reloading.

## index.html

[Open source file](index.html)

### Line 1

```html
<!doctype html>
```

Selects modern HTML standards mode for the document.

### Line 2

```html
<html lang="en">
```

Starts the document; lang="en" identifies the content language as English.

### Line 3

```html
<head>
```

Starts page metadata and resource links; this is not the visible page body.

### Line 4

```html
  <meta charset="utf-8">
```

Decodes the file as UTF-8 so arrows, stars, and other characters display correctly.

### Line 5

```html
  <meta name="viewport" content="width=device-width, initial-scale=1">
```

Uses device width with initial zoom 1 so responsive CSS works on phones.

### Line 6

```html
  <meta name="description" content="Learn about appliance energy consumption in Australian homes.">
```

Provides a page description that search engines may use in a result snippet.

### Line 7

```html
  <title>PowerWise Australia | Home</title>
```

Sets the browser tab and bookmark title, not an on-page heading. Text: "PowerWise Australia | Home". Closes `title`.

### Line 8

```html
  <link rel="preconnect" href="https://fonts.googleapis.com">
```

Prepares a connection to https://fonts.googleapis.com; this does not download a font stylesheet.

### Line 9

```html
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
```

Prepares a connection to https://fonts.gstatic.com; this does not download a font stylesheet. crossorigin requests a connection suitable for cross-origin resource fetching.

### Line 10

```html
  <link rel="stylesheet" href="styles.css">
```

Loads the shared local stylesheet controlling all three pages.

### Line 11

```html
  <script src="script.js" defer></script>
```

Loads script.js; defer lets HTML parsing continue and schedules execution after parsing, before DOMContentLoaded. Closes `script`.

### Line 12

```html
</head>
```

Closes `head`; following content is outside that container.

### Line 13

```html
<body data-page="home">
```

Starts the page body containing the displayed content. Stores page identifier `home` for JavaScript current-page detection.

### Line 14

```html
  <a class="skip-link" href="#main-content">Skip to main content</a>
```

Creates a clickable link to `#main-content`. CSS class hooks: `.skip-link`. Appears on keyboard focus and jumps past navigation. Text: "Skip to main content". Closes `a`.

### Line 15

```html
  <header class="site-header">
```

Starts the header landmark containing the site navigation. CSS class hooks: `.site-header`.

### Line 16

```html
    <nav class="nav-shell" aria-label="Primary navigation">
```

Starts a navigation landmark containing page links. CSS class hooks: `.nav-shell`. Supplies the accessible label "Primary navigation"; generic div labels are not reliably announced without an appropriate role.

### Line 17

```html
      <a class="brand" href="index.html" data-nav-page="home" aria-label="PowerWise Australia home">
```

Creates a clickable link to `index.html`. CSS class hooks: `.brand`. Identifies the link destination for active-link detection and animated navigation. Supplies the accessible label "PowerWise Australia home"; generic div labels are not reliably announced without an appropriate role.

### Line 18

```html
        <img src="PowerIcon.png" alt="" width="46" height="46">
```

Displays `PowerIcon.png` with HTML dimensions 46 x 46, helping reserve space before loading. CSS can resize it. Empty alt marks the image as decorative for assistive technology.

### Line 19

```html
        <span>Power<span>Wise</span></span>
```

Groups inline content so it can be styled or updated separately. Text: "Power". Groups inline content so it can be styled or updated separately. Text: "Wise". Closes `span`. Closes `span`.

### Line 20

```html
      </a>
```

Closes `a`.

### Line 21

```html
      <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="primary-menu">
```

Creates a menu button; type="button" avoids accidental form submission. CSS class hooks: `.menu-toggle`. Reports the menu as initially collapsed; JavaScript updates this state. Associates this control with menu id `primary-menu`.

### Line 22

```html
        <span></span><span></span><span></span><span class="sr-only">Open menu</span>
```

Groups inline content so it can be styled or updated separately. Closes `span`. Groups inline content so it can be styled or updated separately. Closes `span`. Groups inline content so it can be styled or updated separately. Closes `span`. Groups inline content so it can be styled or updated separately. CSS class hooks: `.sr-only`. Visually hidden but available to screen readers. Text: "Open menu". Closes `span`.

### Line 23

```html
      </button>
```

Closes `button`.

### Line 24

```html
      <ul class="nav-links" id="primary-menu">
```

Starts an unordered list; CSS removes bullets and lays out the navigation. CSS class hooks: `.nav-links`. Unique id `primary-menu` provides a target for links, labels, CSS, or JavaScript.

### Line 25

```html
        <li><a href="index.html" data-nav-page="home">Home</a></li>
```

Creates one navigation list item. Creates a clickable link to `index.html`. Identifies the link destination for active-link detection and animated navigation. Text: "Home". Closes `a`. Closes `li`.

### Line 26

```html
        <li><a href="televisions.html" data-nav-page="televisions">Televisions</a></li>
```

Creates one navigation list item. Creates a clickable link to `televisions.html`. Identifies the link destination for active-link detection and animated navigation. Text: "Televisions". Closes `a`. Closes `li`.

### Line 27

```html
        <li><a href="about.html" data-nav-page="about">About Us</a></li>
```

Creates one navigation list item. Creates a clickable link to `about.html`. Identifies the link destination for active-link detection and animated navigation. Text: "About Us". Closes `a`. Closes `li`.

### Line 28

```html
      </ul>
```

Closes `ul`; following content is outside that container.

### Line 29

```html
    </nav>
```

Closes `nav`; following content is outside that container.

### Line 30

```html
  </header>
```

Closes `header`; following content is outside that container.

### Line 31

```html

```

Blank line for readability; no visible effect.

### Line 32

```html
  <main id="main-content">
```

Starts the main content landmark, the destination of the skip link. Unique id `main-content` provides a target for links, labels, CSS, or JavaScript.

### Line 33

```html
    <section class="hero">
```

Groups a thematic section of the page. CSS class hooks: `.hero`.

### Line 34

```html
      <div class="hero-copy reveal">
```

Creates a general-purpose container for grouping and layout. CSS class hooks: `.hero-copy`, `.reveal`. Starts transparent and shifted down; JavaScript adds is-visible as it enters view.

### Line 35

```html
        <p class="eyebrow">Smarter energy choices</p>
```

Creates a paragraph of text. CSS class hooks: `.eyebrow`. Text: "Smarter energy choices". Closes `p`.

### Line 36

```html
        <h1>Small switches.<br><em>Real savings.</em></h1>
```

Creates the main page heading. Text: "Small switches.". Forces a line break in the heading. Marks emphasis; this site colours heading emphasis and removes default italics. Text: "Real savings.". Closes `em`. Closes `h1`.

### Line 37

```html
        <p class="hero-lead">Explore how everyday appliances use electricity and discover practical ways to reduce energy use in Australian homes.</p>
```

Creates a paragraph of text. CSS class hooks: `.hero-lead`. Text: "Explore how everyday appliances use electricity and discover practical ways to reduce energy use in Australian homes.". Closes `p`.

### Line 38

```html
        <div class="hero-actions">
```

Creates a general-purpose container for grouping and layout. CSS class hooks: `.hero-actions`.

### Line 39

```html
          <a class="button button-primary" href="televisions.html" data-nav-page="televisions">Explore televisions <span aria-hidden="true">→</span></a>
```

Creates a clickable link to `televisions.html`. CSS class hooks: `.button`, `.button-primary`. Identifies the link destination for active-link detection and animated navigation. Text: "Explore televisions". Groups inline content so it can be styled or updated separately. Hides this decorative content from assistive technology, not from sight. Text: "→". Closes `span`. Closes `a`.

### Line 40

```html
          <a class="text-link" href="about.html" data-nav-page="about">About this project</a>
```

Creates a clickable link to `about.html`. CSS class hooks: `.text-link`. Identifies the link destination for active-link detection and animated navigation. Text: "About this project". Closes `a`.

### Line 41

```html
        </div>
```

Closes `div`; following content is outside that container.

### Line 42

```html
      </div>
```

Closes `div`; following content is outside that container.

### Line 43

```html
      <div class="hero-visual reveal" aria-label="Illustration of household energy use">
```

Creates a general-purpose container for grouping and layout. CSS class hooks: `.hero-visual`, `.reveal`. Starts transparent and shifted down; JavaScript adds is-visible as it enters view. Supplies the accessible label "Illustration of household energy use"; generic div labels are not reliably announced without an appropriate role.

### Line 44

```html
        <div class="energy-orbit orbit-one"></div>
```

Creates a general-purpose container for grouping and layout. CSS class hooks: `.energy-orbit`, `.orbit-one`. CSS draws the outer circular border; there is no text inside. Closes `div`; following content is outside that container.

### Line 45

```html
        <div class="energy-orbit orbit-two"></div>
```

Creates a general-purpose container for grouping and layout. CSS class hooks: `.energy-orbit`, `.orbit-two`. CSS draws and continuously rotates the inner dashed ring. Closes `div`; following content is outside that container.

### Line 46

```html
        <div class="power-card">
```

Creates a general-purpose container for grouping and layout. CSS class hooks: `.power-card`.

### Line 47

```html
          <img src="PowerIcon.png" alt="" width="88" height="88">
```

Displays `PowerIcon.png` with HTML dimensions 88 x 88, helping reserve space before loading. CSS can resize it. Empty alt marks the image as decorative for assistive technology.

### Line 48

```html
          <strong>Use less.</strong>
```

Marks text as important; CSS also styles these labels and results. Text: "Use less.". Closes `strong`.

### Line 49

```html
          <span>Live comfortably.</span>
```

Groups inline content so it can be styled or updated separately. Text: "Live comfortably.". Closes `span`.

### Line 50

```html
        </div>
```

Closes `div`; following content is outside that container.

### Line 51

```html
        <div class="stat-chip stat-chip-top"><strong>24/7</strong><span>energy awareness</span></div>
```

Creates a general-purpose container for grouping and layout. CSS class hooks: `.stat-chip`, `.stat-chip-top`. Marks text as important; CSS also styles these labels and results. Text: "24/7". Closes `strong`. Groups inline content so it can be styled or updated separately. Text: "energy awareness". Closes `span`. Closes `div`; following content is outside that container.

### Line 52

```html
        <div class="stat-chip stat-chip-bottom"><strong>★</strong><span>compare efficiency</span></div>
```

Creates a general-purpose container for grouping and layout. CSS class hooks: `.stat-chip`, `.stat-chip-bottom`. Marks text as important; CSS also styles these labels and results. Text: "★". Closes `strong`. Groups inline content so it can be styled or updated separately. Text: "compare efficiency". Closes `span`. Closes `div`; following content is outside that container.

### Line 53

```html
      </div>
```

Closes `div`; following content is outside that container.

### Line 54

```html
    </section>
```

Closes `section`; following content is outside that container.

### Line 55

```html

```

Blank line for readability; no visible effect.

### Line 56

```html
    <section class="content-section" aria-labelledby="energy-heading">
```

Groups a thematic section of the page. CSS class hooks: `.content-section`. Names this section using the heading with id `energy-heading`.

### Line 57

```html
      <div class="section-heading reveal">
```

Creates a general-purpose container for grouping and layout. CSS class hooks: `.section-heading`, `.reveal`. Starts transparent and shifted down; JavaScript adds is-visible as it enters view.

### Line 58

```html
        <p class="eyebrow">Know your kilowatts</p>
```

Creates a paragraph of text. CSS class hooks: `.eyebrow`. Text: "Know your kilowatts". Closes `p`.

### Line 59

```html
        <h2 id="energy-heading">A clearer view of home energy</h2>
```

Creates a section heading beneath the main heading. Unique id `energy-heading` provides a target for links, labels, CSS, or JavaScript. Text: "A clearer view of home energy". Closes `h2`.

### Line 60

```html
        <p>Appliance running cost depends on power, time in use and your electricity tariff. Energy labels help make similar products easier to compare.</p>
```

Creates a paragraph of text. Text: "Appliance running cost depends on power, time in use and your electricity tariff. Energy labels help make similar products easier to compare.". Closes `p`.

### Line 61

```html
      </div>
```

Closes `div`; following content is outside that container.

### Line 62

```html
      <div class="feature-grid">
```

Creates a general-purpose container for grouping and layout. CSS class hooks: `.feature-grid`.

### Line 63

```html
        <article class="feature-card reveal">
```

Groups a self-contained card or information item. CSS class hooks: `.feature-card`, `.reveal`. Starts transparent and shifted down; JavaScript adds is-visible as it enters view.

### Line 64

```html
          <span class="card-number">01</span>
```

Groups inline content so it can be styled or updated separately. CSS class hooks: `.card-number`. Text: "01". Closes `span`.

### Line 65

```html
          <h3>Read the label</h3>
```

Creates a card or subsection heading. Text: "Read the label". Closes `h3`.

### Line 66

```html
          <p>Compare the star rating and estimated annual energy use shown on Australia’s Energy Rating Label.</p>
```

Creates a paragraph of text. Text: "Compare the star rating and estimated annual energy use shown on Australia’s Energy Rating Label.". Closes `p`.

### Line 67

```html
        </article>
```

Closes `article`; following content is outside that container.

### Line 68

```html
        <article class="feature-card reveal">
```

Groups a self-contained card or information item. CSS class hooks: `.feature-card`, `.reveal`. Starts transparent and shifted down; JavaScript adds is-visible as it enters view.

### Line 69

```html
          <span class="card-number">02</span>
```

Groups inline content so it can be styled or updated separately. CSS class hooks: `.card-number`. Text: "02". Closes `span`.

### Line 70

```html
          <h3>Check the watts</h3>
```

Creates a card or subsection heading. Text: "Check the watts". Closes `h3`.

### Line 71

```html
          <p>Higher wattage generally means more electricity used for every hour an appliance is switched on.</p>
```

Creates a paragraph of text. Text: "Higher wattage generally means more electricity used for every hour an appliance is switched on.". Closes `p`.

### Line 72

```html
        </article>
```

Closes `article`; following content is outside that container.

### Line 73

```html
        <article class="feature-card reveal">
```

Groups a self-contained card or information item. CSS class hooks: `.feature-card`, `.reveal`. Starts transparent and shifted down; JavaScript adds is-visible as it enters view.

### Line 74

```html
          <span class="card-number">03</span>
```

Groups inline content so it can be styled or updated separately. CSS class hooks: `.card-number`. Text: "03". Closes `span`.

### Line 75

```html
          <h3>Change the habit</h3>
```

Creates a card or subsection heading. Text: "Change the habit". Closes `h3`.

### Line 76

```html
          <p>Turning devices off, using eco modes and reducing unnecessary run time can lower household consumption.</p>
```

Creates a paragraph of text. Text: "Turning devices off, using eco modes and reducing unnecessary run time can lower household consumption.". Closes `p`.

### Line 77

```html
        </article>
```

Closes `article`; following content is outside that container.

### Line 78

```html
      </div>
```

Closes `div`; following content is outside that container.

### Line 79

```html
    </section>
```

Closes `section`; following content is outside that container.

### Line 80

```html

```

Blank line for readability; no visible effect.

### Line 81

```html
    <section class="callout reveal">
```

Groups a thematic section of the page. CSS class hooks: `.callout`, `.reveal`. Starts transparent and shifted down; JavaScript adds is-visible as it enters view.

### Line 82

```html
      <div>
```

Creates a general-purpose container for grouping and layout.

### Line 83

```html
        <p class="eyebrow">Start with the screen</p>
```

Creates a paragraph of text. CSS class hooks: `.eyebrow`. Text: "Start with the screen". Closes `p`.

### Line 84

```html
        <h2>How much does your TV cost to run?</h2>
```

Creates a section heading beneath the main heading. Text: "How much does your TV cost to run?". Closes `h2`.

### Line 85

```html
      </div>
```

Closes `div`; following content is outside that container.

### Line 86

```html
      <a class="button button-light" href="televisions.html" data-nav-page="televisions">Try the calculator <span aria-hidden="true">→</span></a>
```

Creates a clickable link to `televisions.html`. CSS class hooks: `.button`, `.button-light`. Identifies the link destination for active-link detection and animated navigation. Text: "Try the calculator". Groups inline content so it can be styled or updated separately. Hides this decorative content from assistive technology, not from sight. Text: "→". Closes `span`. Closes `a`.

### Line 87

```html
    </section>
```

Closes `section`; following content is outside that container.

### Line 88

```html
  </main>
```

Closes `main`; following content is outside that container.

### Line 89

```html

```

Blank line for readability; no visible effect.

### Line 90

```html
  <footer class="site-footer">
```

Starts the footer landmark for copyright and the AI acknowledgement. CSS class hooks: `.site-footer`.

### Line 91

```html
    <p>© <span data-current-year>2026</span> Haowo0904</p>
```

Creates a paragraph of text. Text: "©". Groups inline content so it can be styled or updated separately. JavaScript replaces the fallback year with the device's current year. Text: "2026". Closes `span`. Text: "Haowo0904". Closes `p`.

### Line 92

```html
    <p>Created with assistance from OpenAI Codex (Generative AI).</p>
```

Creates a paragraph of text. Text: "Created with assistance from OpenAI Codex (Generative AI).". Closes `p`.

### Line 93

```html
  </footer>
```

Closes `footer`; following content is outside that container.

### Line 94

```html
</body>
```

Closes `body`; following content is outside that container.

### Line 95

```html
</html>
```

Closes `html`; following content is outside that container.

## televisions.html

[Open source file](televisions.html)

### Line 1

```html
<!doctype html>
```

Selects modern HTML standards mode for the document.

### Line 2

```html
<html lang="en">
```

Starts the document; lang="en" identifies the content language as English.

### Line 3

```html
<head>
```

Starts page metadata and resource links; this is not the visible page body.

### Line 4

```html
  <meta charset="utf-8">
```

Decodes the file as UTF-8 so arrows, stars, and other characters display correctly.

### Line 5

```html
  <meta name="viewport" content="width=device-width, initial-scale=1">
```

Uses device width with initial zoom 1 so responsive CSS works on phones.

### Line 6

```html
  <meta name="description" content="Compare television energy use and estimate running costs in Australia.">
```

Provides a page description that search engines may use in a result snippet.

### Line 7

```html
  <title>PowerWise Australia | Televisions</title>
```

Sets the browser tab and bookmark title, not an on-page heading. Text: "PowerWise Australia | Televisions". Closes `title`.

### Line 8

```html
  <link rel="preconnect" href="https://fonts.googleapis.com">
```

Prepares a connection to https://fonts.googleapis.com; this does not download a font stylesheet.

### Line 9

```html
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
```

Prepares a connection to https://fonts.gstatic.com; this does not download a font stylesheet. crossorigin requests a connection suitable for cross-origin resource fetching.

### Line 10

```html
  <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&amp;family=Manrope:wght@700;800&amp;display=swap" rel="stylesheet">
```

Loads the Google Fonts stylesheet for DM Sans and Manrope; &amp; represents & in the URL.

### Line 11

```html
  <link rel="stylesheet" href="styles.css">
```

Loads the shared local stylesheet controlling all three pages.

### Line 12

```html
  <script src="script.js" defer></script>
```

Loads script.js; defer lets HTML parsing continue and schedules execution after parsing, before DOMContentLoaded. Closes `script`.

### Line 13

```html
</head>
```

Closes `head`; following content is outside that container.

### Line 14

```html
<body data-page="televisions">
```

Starts the page body containing the displayed content. Stores page identifier `televisions` for JavaScript current-page detection.

### Line 15

```html
  <a class="skip-link" href="#main-content">Skip to main content</a>
```

Creates a clickable link to `#main-content`. CSS class hooks: `.skip-link`. Appears on keyboard focus and jumps past navigation. Text: "Skip to main content". Closes `a`.

### Line 16

```html
  <header class="site-header">
```

Starts the header landmark containing the site navigation. CSS class hooks: `.site-header`.

### Line 17

```html
    <nav class="nav-shell" aria-label="Primary navigation">
```

Starts a navigation landmark containing page links. CSS class hooks: `.nav-shell`. Supplies the accessible label "Primary navigation"; generic div labels are not reliably announced without an appropriate role.

### Line 18

```html
      <a class="brand" href="index.html" data-nav-page="home" aria-label="PowerWise Australia home">
```

Creates a clickable link to `index.html`. CSS class hooks: `.brand`. Identifies the link destination for active-link detection and animated navigation. Supplies the accessible label "PowerWise Australia home"; generic div labels are not reliably announced without an appropriate role.

### Line 19

```html
        <img src="PowerIcon.png" alt="" width="46" height="46">
```

Displays `PowerIcon.png` with HTML dimensions 46 x 46, helping reserve space before loading. CSS can resize it. Empty alt marks the image as decorative for assistive technology.

### Line 20

```html
        <span>Power<span>Wise</span></span>
```

Groups inline content so it can be styled or updated separately. Text: "Power". Groups inline content so it can be styled or updated separately. Text: "Wise". Closes `span`. Closes `span`.

### Line 21

```html
      </a>
```

Closes `a`.

### Line 22

```html
      <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="primary-menu"><span></span><span></span><span></span><span class="sr-only">Open menu</span></button>
```

Creates a menu button; type="button" avoids accidental form submission. CSS class hooks: `.menu-toggle`. Reports the menu as initially collapsed; JavaScript updates this state. Associates this control with menu id `primary-menu`. Groups inline content so it can be styled or updated separately. Closes `span`. Groups inline content so it can be styled or updated separately. Closes `span`. Groups inline content so it can be styled or updated separately. Closes `span`. Groups inline content so it can be styled or updated separately. CSS class hooks: `.sr-only`. Visually hidden but available to screen readers. Text: "Open menu". Closes `span`. Closes `button`.

### Line 23

```html
      <ul class="nav-links" id="primary-menu">
```

Starts an unordered list; CSS removes bullets and lays out the navigation. CSS class hooks: `.nav-links`. Unique id `primary-menu` provides a target for links, labels, CSS, or JavaScript.

### Line 24

```html
        <li><a href="index.html" data-nav-page="home">Home</a></li>
```

Creates one navigation list item. Creates a clickable link to `index.html`. Identifies the link destination for active-link detection and animated navigation. Text: "Home". Closes `a`. Closes `li`.

### Line 25

```html
        <li><a href="televisions.html" data-nav-page="televisions">Televisions</a></li>
```

Creates one navigation list item. Creates a clickable link to `televisions.html`. Identifies the link destination for active-link detection and animated navigation. Text: "Televisions". Closes `a`. Closes `li`.

### Line 26

```html
        <li><a href="about.html" data-nav-page="about">About Us</a></li>
```

Creates one navigation list item. Creates a clickable link to `about.html`. Identifies the link destination for active-link detection and animated navigation. Text: "About Us". Closes `a`. Closes `li`.

### Line 27

```html
      </ul>
```

Closes `ul`; following content is outside that container.

### Line 28

```html
    </nav>
```

Closes `nav`; following content is outside that container.

### Line 29

```html
  </header>
```

Closes `header`; following content is outside that container.

### Line 30

```html

```

Blank line for readability; no visible effect.

### Line 31

```html
  <main id="main-content">
```

Starts the main content landmark, the destination of the skip link. Unique id `main-content` provides a target for links, labels, CSS, or JavaScript.

### Line 32

```html
    <section class="page-banner">
```

Groups a thematic section of the page. CSS class hooks: `.page-banner`.

### Line 33

```html
      <div class="reveal">
```

Creates a general-purpose container for grouping and layout. CSS class hooks: `.reveal`. Starts transparent and shifted down; JavaScript adds is-visible as it enters view.

### Line 34

```html
        <p class="eyebrow">Television energy</p>
```

Creates a paragraph of text. CSS class hooks: `.eyebrow`. Text: "Television energy". Closes `p`.

### Line 35

```html
        <h1>More screen.<br><em>Less waste.</em></h1>
```

Creates the main page heading. Text: "More screen.". Forces a line break in the heading. Marks emphasis; this site colours heading emphasis and removes default italics. Text: "Less waste.". Closes `em`. Closes `h1`.

### Line 36

```html
        <p>Screen size, display technology, brightness and viewing time all influence how much electricity a television uses.</p>
```

Creates a paragraph of text. Text: "Screen size, display technology, brightness and viewing time all influence how much electricity a television uses.". Closes `p`.

### Line 37

```html
      </div>
```

Closes `div`; following content is outside that container.

### Line 38

```html
      <div class="tv-illustration reveal" aria-hidden="true">
```

Creates a general-purpose container for grouping and layout. CSS class hooks: `.tv-illustration`, `.reveal`. Starts transparent and shifted down; JavaScript adds is-visible as it enters view. Hides this decorative content from assistive technology, not from sight.

### Line 39

```html
        <div class="tv-screen"><span>ENERGY</span><strong>★ ★ ★ ★</strong></div>
```

Creates a general-purpose container for grouping and layout. CSS class hooks: `.tv-screen`. Groups inline content so it can be styled or updated separately. Text: "ENERGY". Closes `span`. Marks text as important; CSS also styles these labels and results. Text: "★ ★ ★ ★". Closes `strong`. Closes `div`; following content is outside that container.

### Line 40

```html
        <div class="tv-stand"></div>
```

Creates a general-purpose container for grouping and layout. CSS class hooks: `.tv-stand`. CSS clips a bordered shape to suggest a television stand. Closes `div`; following content is outside that container.

### Line 41

```html
      </div>
```

Closes `div`; following content is outside that container.

### Line 42

```html
    </section>
```

Closes `section`; following content is outside that container.

### Line 43

```html

```

Blank line for readability; no visible effect.

### Line 44

```html
    <section class="content-section split-section" aria-labelledby="calculator-heading">
```

Groups a thematic section of the page. CSS class hooks: `.content-section`, `.split-section`. Names this section using the heading with id `calculator-heading`.

### Line 45

```html
      <div class="calculator-card reveal">
```

Creates a general-purpose container for grouping and layout. CSS class hooks: `.calculator-card`, `.reveal`. Starts transparent and shifted down; JavaScript adds is-visible as it enters view.

### Line 46

```html
        <p class="eyebrow">Quick estimate</p>
```

Creates a paragraph of text. CSS class hooks: `.eyebrow`. Text: "Quick estimate". Closes `p`.

### Line 47

```html
        <h2 id="calculator-heading">TV running cost</h2>
```

Creates a section heading beneath the main heading. Unique id `calculator-heading` provides a target for links, labels, CSS, or JavaScript. Text: "TV running cost". Closes `h2`.

### Line 48

```html
        <form id="energy-calculator">
```

Groups the calculator controls; submitting triggers the JavaScript calculation. Unique id `energy-calculator` provides a target for links, labels, CSS, or JavaScript.

### Line 49

```html
          <label for="wattage">Television power <span>watts</span></label>
```

Labels the input with id `wattage`; clicking the label focuses its input. Text: "Television power". Groups inline content so it can be styled or updated separately. Text: "watts". Closes `span`. Closes `label`.

### Line 50

```html
          <input id="wattage" name="wattage" type="number" min="1" max="2000" value="120" required>
```

Creates a numeric input for `wattage`, initially 120. Browser validation permits values from 1 to 2000 in steps of 1 (the default). required prevents empty submission. name is the key FormData reads. Unique id `wattage` provides a target for links, labels, CSS, or JavaScript.

### Line 51

```html
          <label for="hours">Daily viewing <span>hours</span></label>
```

Labels the input with id `hours`; clicking the label focuses its input. Text: "Daily viewing". Groups inline content so it can be styled or updated separately. Text: "hours". Closes `span`. Closes `label`.

### Line 52

```html
          <input id="hours" name="hours" type="number" min="0" max="24" step="0.5" value="4" required>
```

Creates a numeric input for `hours`, initially 4. Browser validation permits values from 0 to 24 in steps of 0.5. required prevents empty submission. name is the key FormData reads. Unique id `hours` provides a target for links, labels, CSS, or JavaScript.

### Line 53

```html
          <label for="tariff">Electricity tariff <span>cents/kWh</span></label>
```

Labels the input with id `tariff`; clicking the label focuses its input. Text: "Electricity tariff". Groups inline content so it can be styled or updated separately. Text: "cents/kWh". Closes `span`. Closes `label`.

### Line 54

```html
          <input id="tariff" name="tariff" type="number" min="1" max="200" step="0.01" value="35" required>
```

Creates a numeric input for `tariff`, initially 35. Browser validation permits values from 1 to 200 in steps of 0.01. required prevents empty submission. name is the key FormData reads. Unique id `tariff` provides a target for links, labels, CSS, or JavaScript.

### Line 55

```html
          <button class="button button-primary" type="submit">Calculate annual cost</button>
```

Creates a submit button that runs normal form validation and then submits the calculator. CSS class hooks: `.button`, `.button-primary`. Text: "Calculate annual cost". Closes `button`.

### Line 56

```html
        </form>
```

Closes `form`; following content is outside that container.

### Line 57

```html
        <div class="result-panel" id="calculation-result" aria-live="polite">
```

Creates a general-purpose container for grouping and layout. CSS class hooks: `.result-panel`. Unique id `calculation-result` provides a target for links, labels, CSS, or JavaScript. Asks screen readers to announce result changes politely, without immediately interrupting speech.

### Line 58

```html
          <span>Estimated annual running cost</span>
```

Groups inline content so it can be styled or updated separately. Text: "Estimated annual running cost". Closes `span`.

### Line 59

```html
          <strong>$61.32</strong>
```

Marks text as important; CSS also styles these labels and results. Text: "$61.32". Closes `strong`.

### Line 60

```html
          <small>Based on 175.2 kWh per year</small>
```

Creates supplementary text, used here for the annual energy estimate. Text: "Based on 175.2 kWh per year". Closes `small`.

### Line 61

```html
        </div>
```

Closes `div`; following content is outside that container.

### Line 62

```html
      </div>
```

Closes `div`; following content is outside that container.

### Line 63

```html

```

Blank line for readability; no visible effect.

### Line 64

```html
      <div class="tips-panel reveal">
```

Creates a general-purpose container for grouping and layout. CSS class hooks: `.tips-panel`, `.reveal`. Starts transparent and shifted down; JavaScript adds is-visible as it enters view.

### Line 65

```html
        <p class="eyebrow">Before you buy</p>
```

Creates a paragraph of text. CSS class hooks: `.eyebrow`. Text: "Before you buy". Closes `p`.

### Line 66

```html
        <h2>Compare the whole picture</h2>
```

Creates a section heading beneath the main heading. Text: "Compare the whole picture". Closes `h2`.

### Line 67

```html
        <div class="tip-list">
```

Creates a general-purpose container for grouping and layout. CSS class hooks: `.tip-list`.

### Line 68

```html
          <article><span>01</span><div><h3>Look for more stars</h3><p>More stars indicate better energy efficiency compared with products of a similar size.</p></div></article>
```

Groups a self-contained card or information item. Groups inline content so it can be styled or updated separately. Text: "01". Closes `span`. Creates a general-purpose container for grouping and layout. Creates a card or subsection heading. Text: "Look for more stars". Closes `h3`. Creates a paragraph of text. Text: "More stars indicate better energy efficiency compared with products of a similar size.". Closes `p`. Closes `div`; following content is outside that container. Closes `article`; following content is outside that container.

### Line 69

```html
          <article><span>02</span><div><h3>Compare annual kWh</h3><p>The energy consumption figure estimates electricity use under standard test conditions.</p></div></article>
```

Groups a self-contained card or information item. Groups inline content so it can be styled or updated separately. Text: "02". Closes `span`. Creates a general-purpose container for grouping and layout. Creates a card or subsection heading. Text: "Compare annual kWh". Closes `h3`. Creates a paragraph of text. Text: "The energy consumption figure estimates electricity use under standard test conditions.". Closes `p`. Closes `div`; following content is outside that container. Closes `article`; following content is outside that container.

### Line 70

```html
          <article><span>03</span><div><h3>Choose the right size</h3><p>Larger screens usually consume more energy, so match the screen to the room and viewing distance.</p></div></article>
```

Groups a self-contained card or information item. Groups inline content so it can be styled or updated separately. Text: "03". Closes `span`. Creates a general-purpose container for grouping and layout. Creates a card or subsection heading. Text: "Choose the right size". Closes `h3`. Creates a paragraph of text. Text: "Larger screens usually consume more energy, so match the screen to the room and viewing distance.". Closes `p`. Closes `div`; following content is outside that container. Closes `article`; following content is outside that container.

### Line 71

```html
          <article><span>04</span><div><h3>Use energy-saving settings</h3><p>Automatic brightness, sleep timers and standby controls can reduce unnecessary use.</p></div></article>
```

Groups a self-contained card or information item. Groups inline content so it can be styled or updated separately. Text: "04". Closes `span`. Creates a general-purpose container for grouping and layout. Creates a card or subsection heading. Text: "Use energy-saving settings". Closes `h3`. Creates a paragraph of text. Text: "Automatic brightness, sleep timers and standby controls can reduce unnecessary use.". Closes `p`. Closes `div`; following content is outside that container. Closes `article`; following content is outside that container.

### Line 72

```html
        </div>
```

Closes `div`; following content is outside that container.

### Line 73

```html
      </div>
```

Closes `div`; following content is outside that container.

### Line 74

```html
    </section>
```

Closes `section`; following content is outside that container.

### Line 75

```html

```

Blank line for readability; no visible effect.

### Line 76

```html
    <section class="chart-section" aria-labelledby="charts-heading">
```

Groups a thematic section of the page. CSS class hooks: `.chart-section`. Names this section using the heading with id `charts-heading`.

### Line 77

```html
      <div class="section-heading reveal">
```

Creates a general-purpose container for grouping and layout. CSS class hooks: `.section-heading`, `.reveal`. Starts transparent and shifted down; JavaScript adds is-visible as it enters view.

### Line 78

```html
        <p class="eyebrow">Television data</p>
```

Creates a paragraph of text. CSS class hooks: `.eyebrow`. Text: "Television data". Closes `p`.

### Line 79

```html
        <h2 id="charts-heading">Explore the energy patterns</h2>
```

Creates a section heading beneath the main heading. Unique id `charts-heading` provides a target for links, labels, CSS, or JavaScript. Text: "Explore the energy patterns". Closes `h2`.

### Line 80

```html
        <p>These charts provide three different views of television power consumption, display technology and screen size.</p>
```

Creates a paragraph of text. Text: "These charts provide three different views of television power consumption, display technology and screen size.". Closes `p`.

### Line 81

```html
      </div>
```

Closes `div`; following content is outside that container.

### Line 82

```html
      <div class="chart-gallery">
```

Creates a general-purpose container for grouping and layout. CSS class hooks: `.chart-gallery`.

### Line 83

```html
        <figure class="chart-card reveal">
```

Groups a chart image with its caption. CSS class hooks: `.chart-card`, `.reveal`. Starts transparent and shifted down; JavaScript adds is-visible as it enters view.

### Line 84

```html
          <img src="assets/charts/bar-chart.png" alt="Bar chart comparing average mode power across ten television brands, with Spark Electronics highest and Tavice lowest." width="1373" height="440" loading="lazy">
```

Displays `assets/charts/bar-chart.png` with HTML dimensions 1373 x 440, helping reserve space before loading. CSS can resize it. The alt text provides a written alternative describing the chart. Lazy loading allows the browser to defer fetching until the image is near the viewport.

### Line 85

```html
          <figcaption><strong>Average power by brand</strong><span>Compares average mode power across television brands in the dataset.</span></figcaption>
```

Supplies the accompanying chart title and explanation. Marks text as important; CSS also styles these labels and results. Text: "Average power by brand". Closes `strong`. Groups inline content so it can be styled or updated separately. Text: "Compares average mode power across television brands in the dataset.". Closes `span`. Closes `figcaption`.

### Line 86

```html
        </figure>
```

Closes `figure`.

### Line 87

```html
        <figure class="chart-card reveal">
```

Groups a chart image with its caption. CSS class hooks: `.chart-card`, `.reveal`. Starts transparent and shifted down; JavaScript adds is-visible as it enters view.

### Line 88

```html
          <img src="assets/charts/pie-chart.png" alt="Pie chart showing LCD LED as the largest television display category, followed by LCD and OLED." width="1373" height="440" loading="lazy">
```

Displays `assets/charts/pie-chart.png` with HTML dimensions 1373 x 440, helping reserve space before loading. CSS can resize it. The alt text provides a written alternative describing the chart. Lazy loading allows the browser to defer fetching until the image is near the viewport.

### Line 89

```html
          <figcaption><strong>Display technology mix</strong><span>Shows the proportion of LCD (LED), LCD and OLED models represented.</span></figcaption>
```

Supplies the accompanying chart title and explanation. Marks text as important; CSS also styles these labels and results. Text: "Display technology mix". Closes `strong`. Groups inline content so it can be styled or updated separately. Text: "Shows the proportion of LCD (LED), LCD and OLED models represented.". Closes `span`. Closes `figcaption`.

### Line 90

```html
        </figure>
```

Closes `figure`.

### Line 91

```html
        <figure class="chart-card reveal">
```

Groups a chart image with its caption. CSS class hooks: `.chart-card`, `.reveal`. Starts transparent and shifted down; JavaScript adds is-visible as it enters view.

### Line 92

```html
          <img src="assets/charts/scatter-plot.png" alt="Scatter plot showing that average mode power generally rises as television screen size increases." width="1373" height="440" loading="lazy">
```

Displays `assets/charts/scatter-plot.png` with HTML dimensions 1373 x 440, helping reserve space before loading. CSS can resize it. The alt text provides a written alternative describing the chart. Lazy loading allows the browser to defer fetching until the image is near the viewport.

### Line 93

```html
          <figcaption><strong>Screen size and power</strong><span>Highlights the general relationship between screen size in inches and average mode power.</span></figcaption>
```

Supplies the accompanying chart title and explanation. Marks text as important; CSS also styles these labels and results. Text: "Screen size and power". Closes `strong`. Groups inline content so it can be styled or updated separately. Text: "Highlights the general relationship between screen size in inches and average mode power.". Closes `span`. Closes `figcaption`.

### Line 94

```html
        </figure>
```

Closes `figure`.

### Line 95

```html
      </div>
```

Closes `div`; following content is outside that container.

### Line 96

```html
    </section>
```

Closes `section`; following content is outside that container.

### Line 97

```html

```

Blank line for readability; no visible effect.

### Line 98

```html
    <section class="info-note reveal">
```

Groups a thematic section of the page. CSS class hooks: `.info-note`, `.reveal`. Starts transparent and shifted down; JavaScript adds is-visible as it enters view.

### Line 99

```html
      <strong>How the estimate works</strong>
```

Marks text as important; CSS also styles these labels and results. Text: "How the estimate works". Closes `strong`.

### Line 100

```html
      <p>Watts ÷ 1,000 × hours per day × 365 × tariff. Results are illustrative; actual use and electricity prices vary.</p>
```

Creates a paragraph of text. Text: "Watts ÷ 1,000 × hours per day × 365 × tariff. Results are illustrative; actual use and electricity prices vary.". Closes `p`.

### Line 101

```html
    </section>
```

Closes `section`; following content is outside that container.

### Line 102

```html
  </main>
```

Closes `main`; following content is outside that container.

### Line 103

```html

```

Blank line for readability; no visible effect.

### Line 104

```html
  <footer class="site-footer">
```

Starts the footer landmark for copyright and the AI acknowledgement. CSS class hooks: `.site-footer`.

### Line 105

```html
    <p>© <span data-current-year>2026</span> Haowo0904</p>
```

Creates a paragraph of text. Text: "©". Groups inline content so it can be styled or updated separately. JavaScript replaces the fallback year with the device's current year. Text: "2026". Closes `span`. Text: "Haowo0904". Closes `p`.

### Line 106

```html
    <p>Created with assistance from OpenAI Codex (Generative AI).</p>
```

Creates a paragraph of text. Text: "Created with assistance from OpenAI Codex (Generative AI).". Closes `p`.

### Line 107

```html
  </footer>
```

Closes `footer`; following content is outside that container.

### Line 108

```html
</body>
```

Closes `body`; following content is outside that container.

### Line 109

```html
</html>
```

Closes `html`; following content is outside that container.

## about.html

[Open source file](about.html)

### Line 1

```html
<!doctype html>
```

Selects modern HTML standards mode for the document.

### Line 2

```html
<html lang="en">
```

Starts the document; lang="en" identifies the content language as English.

### Line 3

```html
<head>
```

Starts page metadata and resource links; this is not the visible page body.

### Line 4

```html
  <meta charset="utf-8">
```

Decodes the file as UTF-8 so arrows, stars, and other characters display correctly.

### Line 5

```html
  <meta name="viewport" content="width=device-width, initial-scale=1">
```

Uses device width with initial zoom 1 so responsive CSS works on phones.

### Line 6

```html
  <meta name="description" content="About the PowerWise Australia student website project.">
```

Provides a page description that search engines may use in a result snippet.

### Line 7

```html
  <title>PowerWise Australia | About Us</title>
```

Sets the browser tab and bookmark title, not an on-page heading. Text: "PowerWise Australia | About Us". Closes `title`.

### Line 8

```html
  <link rel="preconnect" href="https://fonts.googleapis.com">
```

Prepares a connection to https://fonts.googleapis.com; this does not download a font stylesheet.

### Line 9

```html
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
```

Prepares a connection to https://fonts.gstatic.com; this does not download a font stylesheet. crossorigin requests a connection suitable for cross-origin resource fetching.

### Line 10

```html
  <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&amp;family=Manrope:wght@700;800&amp;display=swap" rel="stylesheet">
```

Loads the Google Fonts stylesheet for DM Sans and Manrope; &amp; represents & in the URL.

### Line 11

```html
  <link rel="stylesheet" href="styles.css">
```

Loads the shared local stylesheet controlling all three pages.

### Line 12

```html
  <script src="script.js" defer></script>
```

Loads script.js; defer lets HTML parsing continue and schedules execution after parsing, before DOMContentLoaded. Closes `script`.

### Line 13

```html
</head>
```

Closes `head`; following content is outside that container.

### Line 14

```html
<body data-page="about">
```

Starts the page body containing the displayed content. Stores page identifier `about` for JavaScript current-page detection.

### Line 15

```html
  <a class="skip-link" href="#main-content">Skip to main content</a>
```

Creates a clickable link to `#main-content`. CSS class hooks: `.skip-link`. Appears on keyboard focus and jumps past navigation. Text: "Skip to main content". Closes `a`.

### Line 16

```html
  <header class="site-header">
```

Starts the header landmark containing the site navigation. CSS class hooks: `.site-header`.

### Line 17

```html
    <nav class="nav-shell" aria-label="Primary navigation">
```

Starts a navigation landmark containing page links. CSS class hooks: `.nav-shell`. Supplies the accessible label "Primary navigation"; generic div labels are not reliably announced without an appropriate role.

### Line 18

```html
      <a class="brand" href="index.html" data-nav-page="home" aria-label="PowerWise Australia home">
```

Creates a clickable link to `index.html`. CSS class hooks: `.brand`. Identifies the link destination for active-link detection and animated navigation. Supplies the accessible label "PowerWise Australia home"; generic div labels are not reliably announced without an appropriate role.

### Line 19

```html
        <img src="PowerIcon.png" alt="" width="46" height="46">
```

Displays `PowerIcon.png` with HTML dimensions 46 x 46, helping reserve space before loading. CSS can resize it. Empty alt marks the image as decorative for assistive technology.

### Line 20

```html
        <span>Power<span>Wise</span></span>
```

Groups inline content so it can be styled or updated separately. Text: "Power". Groups inline content so it can be styled or updated separately. Text: "Wise". Closes `span`. Closes `span`.

### Line 21

```html
      </a>
```

Closes `a`.

### Line 22

```html
      <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="primary-menu"><span></span><span></span><span></span><span class="sr-only">Open menu</span></button>
```

Creates a menu button; type="button" avoids accidental form submission. CSS class hooks: `.menu-toggle`. Reports the menu as initially collapsed; JavaScript updates this state. Associates this control with menu id `primary-menu`. Groups inline content so it can be styled or updated separately. Closes `span`. Groups inline content so it can be styled or updated separately. Closes `span`. Groups inline content so it can be styled or updated separately. Closes `span`. Groups inline content so it can be styled or updated separately. CSS class hooks: `.sr-only`. Visually hidden but available to screen readers. Text: "Open menu". Closes `span`. Closes `button`.

### Line 23

```html
      <ul class="nav-links" id="primary-menu">
```

Starts an unordered list; CSS removes bullets and lays out the navigation. CSS class hooks: `.nav-links`. Unique id `primary-menu` provides a target for links, labels, CSS, or JavaScript.

### Line 24

```html
        <li><a href="index.html" data-nav-page="home">Home</a></li>
```

Creates one navigation list item. Creates a clickable link to `index.html`. Identifies the link destination for active-link detection and animated navigation. Text: "Home". Closes `a`. Closes `li`.

### Line 25

```html
        <li><a href="televisions.html" data-nav-page="televisions">Televisions</a></li>
```

Creates one navigation list item. Creates a clickable link to `televisions.html`. Identifies the link destination for active-link detection and animated navigation. Text: "Televisions". Closes `a`. Closes `li`.

### Line 26

```html
        <li><a href="about.html" data-nav-page="about">About Us</a></li>
```

Creates one navigation list item. Creates a clickable link to `about.html`. Identifies the link destination for active-link detection and animated navigation. Text: "About Us". Closes `a`. Closes `li`.

### Line 27

```html
      </ul>
```

Closes `ul`; following content is outside that container.

### Line 28

```html
    </nav>
```

Closes `nav`; following content is outside that container.

### Line 29

```html
  </header>
```

Closes `header`; following content is outside that container.

### Line 30

```html

```

Blank line for readability; no visible effect.

### Line 31

```html
  <main id="main-content">
```

Starts the main content landmark, the destination of the skip link. Unique id `main-content` provides a target for links, labels, CSS, or JavaScript.

### Line 32

```html
    <section class="about-hero">
```

Groups a thematic section of the page. CSS class hooks: `.about-hero`.

### Line 33

```html
      <div class="reveal">
```

Creates a general-purpose container for grouping and layout. CSS class hooks: `.reveal`. Starts transparent and shifted down; JavaScript adds is-visible as it enters view.

### Line 34

```html
        <p class="eyebrow">About PowerWise</p>
```

Creates a paragraph of text. CSS class hooks: `.eyebrow`. Text: "About PowerWise". Closes `p`.

### Line 35

```html
        <h1>Energy information,<br><em>made approachable.</em></h1>
```

Creates the main page heading. Text: "Energy information,". Forces a line break in the heading. Marks emphasis; this site colours heading emphasis and removes default italics. Text: "made approachable.". Closes `em`. Closes `h1`.

### Line 36

```html
      </div>
```

Closes `div`; following content is outside that container.

### Line 37

```html
      <p class="about-intro reveal">PowerWise is a student-built demonstration website designed to practise HTML structure, CSS styling and JavaScript interactions while sharing introductory information about household appliance energy consumption in Australia.</p>
```

Creates a paragraph of text. CSS class hooks: `.about-intro`, `.reveal`. Starts transparent and shifted down; JavaScript adds is-visible as it enters view. Text: "PowerWise is a student-built demonstration website designed to practise HTML structure, CSS styling and JavaScript interactions while sharing introductory information about household appliance energy consumption in Australia.". Closes `p`.

### Line 38

```html
    </section>
```

Closes `section`; following content is outside that container.

### Line 39

```html

```

Blank line for readability; no visible effect.

### Line 40

```html
    <section class="content-section about-grid" aria-label="Project information">
```

Groups a thematic section of the page. CSS class hooks: `.content-section`, `.about-grid`. Supplies the accessible label "Project information"; generic div labels are not reliably announced without an appropriate role.

### Line 41

```html
      <article class="mission-card reveal">
```

Groups a self-contained card or information item. CSS class hooks: `.mission-card`, `.reveal`. Starts transparent and shifted down; JavaScript adds is-visible as it enters view.

### Line 42

```html
        <span class="large-icon">↯</span>
```

Groups inline content so it can be styled or updated separately. CSS class hooks: `.large-icon`. Text: "↯". Closes `span`.

### Line 43

```html
        <p class="eyebrow">Our purpose</p>
```

Creates a paragraph of text. CSS class hooks: `.eyebrow`. Text: "Our purpose". Closes `p`.

### Line 44

```html
        <h2>Make every watt easier to understand.</h2>
```

Creates a section heading beneath the main heading. Text: "Make every watt easier to understand.". Closes `h2`.

### Line 45

```html
        <p>We present simple explanations that encourage people to compare appliance labels, consider running costs and use household technology thoughtfully.</p>
```

Creates a paragraph of text. Text: "We present simple explanations that encourage people to compare appliance labels, consider running costs and use household technology thoughtfully.". Closes `p`.

### Line 46

```html
      </article>
```

Closes `article`; following content is outside that container.

### Line 47

```html
      <div class="values-list reveal">
```

Creates a general-purpose container for grouping and layout. CSS class hooks: `.values-list`, `.reveal`. Starts transparent and shifted down; JavaScript adds is-visible as it enters view.

### Line 48

```html
        <article><strong>01</strong><div><h3>Clear</h3><p>Plain-language information for everyday decisions.</p></div></article>
```

Groups a self-contained card or information item. Marks text as important; CSS also styles these labels and results. Text: "01". Closes `strong`. Creates a general-purpose container for grouping and layout. Creates a card or subsection heading. Text: "Clear". Closes `h3`. Creates a paragraph of text. Text: "Plain-language information for everyday decisions.". Closes `p`. Closes `div`; following content is outside that container. Closes `article`; following content is outside that container.

### Line 49

```html
        <article><strong>02</strong><div><h3>Practical</h3><p>Useful comparisons and an interactive cost estimate.</p></div></article>
```

Groups a self-contained card or information item. Marks text as important; CSS also styles these labels and results. Text: "02". Closes `strong`. Creates a general-purpose container for grouping and layout. Creates a card or subsection heading. Text: "Practical". Closes `h3`. Creates a paragraph of text. Text: "Useful comparisons and an interactive cost estimate.". Closes `p`. Closes `div`; following content is outside that container. Closes `article`; following content is outside that container.

### Line 50

```html
        <article><strong>03</strong><div><h3>Responsible</h3><p>Encouraging lower consumption without sacrificing comfort.</p></div></article>
```

Groups a self-contained card or information item. Marks text as important; CSS also styles these labels and results. Text: "03". Closes `strong`. Creates a general-purpose container for grouping and layout. Creates a card or subsection heading. Text: "Responsible". Closes `h3`. Creates a paragraph of text. Text: "Encouraging lower consumption without sacrificing comfort.". Closes `p`. Closes `div`; following content is outside that container. Closes `article`; following content is outside that container.

### Line 51

```html
      </div>
```

Closes `div`; following content is outside that container.

### Line 52

```html
    </section>
```

Closes `section`; following content is outside that container.

### Line 53

```html

```

Blank line for readability; no visible effect.

### Line 54

```html
    <section class="process-section">
```

Groups a thematic section of the page. CSS class hooks: `.process-section`.

### Line 55

```html
      <div class="section-heading reveal">
```

Creates a general-purpose container for grouping and layout. CSS class hooks: `.section-heading`, `.reveal`. Starts transparent and shifted down; JavaScript adds is-visible as it enters view.

### Line 56

```html
        <p class="eyebrow">Behind the website</p>
```

Creates a paragraph of text. CSS class hooks: `.eyebrow`. Text: "Behind the website". Closes `p`.

### Line 57

```html
        <h2>Built with the web’s core technologies</h2>
```

Creates a section heading beneath the main heading. Text: "Built with the web’s core technologies". Closes `h2`.

### Line 58

```html
      </div>
```

Closes `div`; following content is outside that container.

### Line 59

```html
      <div class="tech-grid">
```

Creates a general-purpose container for grouping and layout. CSS class hooks: `.tech-grid`.

### Line 60

```html
        <article class="reveal"><span>&lt;/&gt;</span><h3>HTML</h3><p>Semantic page structure and accessible content.</p></article>
```

Groups a self-contained card or information item. CSS class hooks: `.reveal`. Starts transparent and shifted down; JavaScript adds is-visible as it enters view. Groups inline content so it can be styled or updated separately. Text: "</>". Closes `span`. Creates a card or subsection heading. Text: "HTML". Closes `h3`. Creates a paragraph of text. Text: "Semantic page structure and accessible content.". Closes `p`. Closes `article`; following content is outside that container.

### Line 61

```html
        <article class="reveal"><span>{ }</span><h3>CSS</h3><p>Responsive layouts, colour, motion and visual feedback.</p></article>
```

Groups a self-contained card or information item. CSS class hooks: `.reveal`. Starts transparent and shifted down; JavaScript adds is-visible as it enters view. Groups inline content so it can be styled or updated separately. Text: "{ }". Closes `span`. Creates a card or subsection heading. Text: "CSS". Closes `h3`. Creates a paragraph of text. Text: "Responsive layouts, colour, motion and visual feedback.". Closes `p`. Closes `article`; following content is outside that container.

### Line 62

```html
        <article class="reveal"><span>JS</span><h3>JavaScript</h3><p>Navigation, mobile menu, page effects and calculations.</p></article>
```

Groups a self-contained card or information item. CSS class hooks: `.reveal`. Starts transparent and shifted down; JavaScript adds is-visible as it enters view. Groups inline content so it can be styled or updated separately. Text: "JS". Closes `span`. Creates a card or subsection heading. Text: "JavaScript". Closes `h3`. Creates a paragraph of text. Text: "Navigation, mobile menu, page effects and calculations.". Closes `p`. Closes `article`; following content is outside that container.

### Line 63

```html
      </div>
```

Closes `div`; following content is outside that container.

### Line 64

```html
    </section>
```

Closes `section`; following content is outside that container.

### Line 65

```html
  </main>
```

Closes `main`; following content is outside that container.

### Line 66

```html

```

Blank line for readability; no visible effect.

### Line 67

```html
  <footer class="site-footer">
```

Starts the footer landmark for copyright and the AI acknowledgement. CSS class hooks: `.site-footer`.

### Line 68

```html
    <p>© <span data-current-year>2026</span> Haowo0904</p>
```

Creates a paragraph of text. Text: "©". Groups inline content so it can be styled or updated separately. JavaScript replaces the fallback year with the device's current year. Text: "2026". Closes `span`. Text: "Haowo0904". Closes `p`.

### Line 69

```html
    <p>Created with assistance from OpenAI Codex (Generative AI).</p>
```

Creates a paragraph of text. Text: "Created with assistance from OpenAI Codex (Generative AI).". Closes `p`.

### Line 70

```html
  </footer>
```

Closes `footer`; following content is outside that container.

### Line 71

```html
</body>
```

Closes `body`; following content is outside that container.

### Line 72

```html
</html>
```

Closes `html`; following content is outside that container.

## styles.css

[Open source file](styles.css)

### Line 1

```css
:root {
```

Targets `:root`. The document root holds the shared theme variables.

### Line 2

```css
  --navy: #5c4932;
```

For `:root`: Defines reusable custom property `--navy` as `#5c4932`; var(--navy) reads it elsewhere.

### Line 3

```css
  --navy-soft: #745d3e;
```

For `:root`: Defines reusable custom property `--navy-soft` as `#745d3e`; var(--navy-soft) reads it elsewhere.

### Line 4

```css
  --green: #f2aa3d;
```

For `:root`: Defines reusable custom property `--green` as `#f2aa3d`; var(--green) reads it elsewhere.

### Line 5

```css
  --green-dark: #a96518;
```

For `:root`: Defines reusable custom property `--green-dark` as `#a96518`; var(--green-dark) reads it elsewhere.

### Line 6

```css
  --green-pale: #fff0b9;
```

For `:root`: Defines reusable custom property `--green-pale` as `#fff0b9`; var(--green-pale) reads it elsewhere.

### Line 7

```css
  --cream: #fffaf0;
```

For `:root`: Defines reusable custom property `--cream` as `#fffaf0`; var(--cream) reads it elsewhere.

### Line 8

```css
  --white: #ffffff;
```

For `:root`: Defines reusable custom property `--white` as `#ffffff`; var(--white) reads it elsewhere.

### Line 9

```css
  --ink-muted: #756751;
```

For `:root`: Defines reusable custom property `--ink-muted` as `#756751`; var(--ink-muted) reads it elsewhere.

### Line 10

```css
  --line: #e6d6ad;
```

For `:root`: Defines reusable custom property `--line` as `#e6d6ad`; var(--line) reads it elsewhere.

### Line 11

```css
  --shadow: 0 22px 60px rgba(92, 73, 50, 0.16);
```

For `:root`: Defines reusable custom property `--shadow` as `0 22px 60px rgba(92, 73, 50, 0.16)`; var(--shadow) reads it elsewhere.

### Line 12

```css
}
```

Ends the declarations for `:root`.

### Line 13

```css

```

Blank line for readability; no visible effect.

### Line 14

```css
* { box-sizing: border-box; }
```

Targets `*`. Includes padding and borders in declared dimensions: `border-box`.

### Line 15

```css

```

Blank line for readability; no visible effect.

### Line 16

```css
html { scroll-behavior: smooth; }
```

Targets `html`. Controls scrolling to anchors: smooth animates; auto uses normal immediate scrolling: `smooth`.

### Line 17

```css

```

Blank line for readability; no visible effect.

### Line 18

```css
body {
```

Targets `body`.

### Line 19

```css
  margin: 0;
```

For `body`: Sets space outside the element: `0`. Shorthand order: one value = all sides; two = vertical/horizontal; three = top/horizontal/bottom; four = top/right/bottom/left.

### Line 20

```css
  color: var(--navy);
```

For `body`: Sets foreground/text colour: `var(--navy)`. var(...) reads a shared custom property defined near the start of the file.

### Line 21

```css
  background: var(--cream);
```

For `body`: Sets the background colour or gradient: `var(--cream)`. var(...) reads a shared custom property defined near the start of the file.

### Line 22

```css
  font-family: "DM Sans", Arial, sans-serif;
```

For `body`: Lists the preferred font and fallback fonts in order: `"DM Sans", Arial, sans-serif`.

### Line 23

```css
  line-height: 1.6;
```

For `body`: Sets line spacing; a unitless number multiplies font size: `1.6`.

### Line 24

```css
  opacity: 1;
```

For `body`: Sets transparency: 0 is invisible and 1 is fully visible; layout space remains: `1`.

### Line 25

```css
  transition: opacity 180ms ease;
```

For `body`: Animates changes to the listed properties over the stated duration and easing: `opacity 180ms ease`.

### Line 26

```css
}
```

Ends the declarations for `body`.

### Line 27

```css

```

Blank line for readability; no visible effect.

### Line 28

```css
body.page-leaving { opacity: 0; }
```

Targets `body.page-leaving`. JavaScript adds this before changing pages to trigger the fade-out. Sets transparency: 0 is invisible and 1 is fully visible; layout space remains: `0`.

### Line 29

```css

```

Blank line for readability; no visible effect.

### Line 30

```css
h1, h2, h3, p { margin-top: 0; }
```

Targets `h1, h2, h3, p`. Sets outside space above: `0`.

### Line 31

```css

```

Blank line for readability; no visible effect.

### Line 32

```css
h1, h2, h3 {
```

Targets `h1, h2, h3`.

### Line 33

```css
  font-family: "Manrope", "Arial Black", sans-serif;
```

For `h1, h2, h3`: Lists the preferred font and fallback fonts in order: `"Manrope", "Arial Black", sans-serif`.

### Line 34

```css
  line-height: 1.12;
```

For `h1, h2, h3`: Sets line spacing; a unitless number multiplies font size: `1.12`.

### Line 35

```css
}
```

Ends the declarations for `h1, h2, h3`.

### Line 36

```css

```

Blank line for readability; no visible effect.

### Line 37

```css
h1 { font-size: clamp(3.2rem, 7vw, 6.7rem); letter-spacing: -0.065em; }
```

Targets `h1`. Sets text size: `clamp(3.2rem, 7vw, 6.7rem)`. clamp(minimum, preferred, maximum) lets the preferred size vary within limits. Adjusts spacing between characters; negative values tighten it: `-0.065em`.

### Line 38

```css
h2 { font-size: clamp(2rem, 4vw, 3.5rem); letter-spacing: -0.04em; }
```

Targets `h2`. Sets text size: `clamp(2rem, 4vw, 3.5rem)`. clamp(minimum, preferred, maximum) lets the preferred size vary within limits. Adjusts spacing between characters; negative values tighten it: `-0.04em`.

### Line 39

```css
h3 { letter-spacing: -0.025em; }
```

Targets `h3`. Adjusts spacing between characters; negative values tighten it: `-0.025em`.

### Line 40

```css
h1 em { color: var(--green-dark); font-style: normal; }
```

Targets `h1 em`. Sets foreground/text colour: `var(--green-dark)`. var(...) reads a shared custom property defined near the start of the file. Controls italic or normal text: `normal`.

### Line 41

```css
a { color: inherit; }
```

Targets `a`. Sets foreground/text colour: `inherit`.

### Line 42

```css

```

Blank line for readability; no visible effect.

### Line 43

```css
.sr-only {
```

Targets `.sr-only`.

### Line 44

```css
  position: absolute;
```

For `.sr-only`: Sets positioning behaviour: `absolute`. Removes the element from normal flow and positions it relative to its containing block.

### Line 45

```css
  width: 1px;
```

For `.sr-only`: Sets element width: `1px`.

### Line 46

```css
  height: 1px;
```

For `.sr-only`: Sets element height: `1px`.

### Line 47

```css
  padding: 0;
```

For `.sr-only`: Sets space inside the border: `0`. Shorthand order: one value = all sides; two = vertical/horizontal; three = top/horizontal/bottom; four = top/right/bottom/left.

### Line 48

```css
  margin: -1px;
```

For `.sr-only`: Sets space outside the element: `-1px`. Shorthand order: one value = all sides; two = vertical/horizontal; three = top/horizontal/bottom; four = top/right/bottom/left.

### Line 49

```css
  overflow: hidden;
```

For `.sr-only`: Controls content outside the box; hidden clips it: `hidden`.

### Line 50

```css
  clip: rect(0, 0, 0, 0);
```

For `.sr-only`: Clips the absolutely positioned box to a rectangle, helping visually hide screen-reader-only text: `rect(0, 0, 0, 0)`.

### Line 51

```css
  white-space: nowrap;
```

For `.sr-only`: Controls text wrapping; nowrap prevents wrapping: `nowrap`.

### Line 52

```css
  border: 0;
```

For `.sr-only`: Sets border thickness, style, and colour; 0 removes it: `0`.

### Line 53

```css
}
```

Ends the declarations for `.sr-only`.

### Line 54

```css

```

Blank line for readability; no visible effect.

### Line 55

```css
.skip-link {
```

Targets `.skip-link`.

### Line 56

```css
  position: fixed;
```

For `.skip-link`: Sets positioning behaviour: `fixed`. Positions relative to the viewport in this page.

### Line 57

```css
  z-index: 100;
```

For `.skip-link`: Sets stacking order within the relevant stacking context: `100`.

### Line 58

```css
  top: 10px;
```

For `.skip-link`: Sets the top positioning offset: `10px`.

### Line 59

```css
  left: 10px;
```

For `.skip-link`: Sets the left positioning offset: `10px`.

### Line 60

```css
  padding: 10px 16px;
```

For `.skip-link`: Sets space inside the border: `10px 16px`. Shorthand order: one value = all sides; two = vertical/horizontal; three = top/horizontal/bottom; four = top/right/bottom/left.

### Line 61

```css
  color: var(--white);
```

For `.skip-link`: Sets foreground/text colour: `var(--white)`. var(...) reads a shared custom property defined near the start of the file.

### Line 62

```css
  background: var(--navy);
```

For `.skip-link`: Sets the background colour or gradient: `var(--navy)`. var(...) reads a shared custom property defined near the start of the file.

### Line 63

```css
  transform: translateY(-150%);
```

For `.skip-link`: Transforms the element: moves vertically (negative is upward) by `-150%`.

### Line 64

```css
}
```

Ends the declarations for `.skip-link`.

### Line 65

```css

```

Blank line for readability; no visible effect.

### Line 66

```css
.skip-link:focus { transform: translateY(0); }
```

Targets `.skip-link:focus`. Applies when the element has keyboard or input focus. Transforms the element: moves vertically (negative is upward) by `0`.

### Line 67

```css

```

Blank line for readability; no visible effect.

### Line 68

```css
.site-header {
```

Targets `.site-header`.

### Line 69

```css
  position: sticky;
```

For `.site-header`: Sets positioning behaviour: `sticky`. Stays in normal flow until scrolling reaches its offset, then sticks within its container.

### Line 70

```css
  z-index: 20;
```

For `.site-header`: Sets stacking order within the relevant stacking context: `20`.

### Line 71

```css
  top: 0;
```

For `.site-header`: Sets the top positioning offset: `0`.

### Line 72

```css
  background: rgba(255, 250, 240, 0.92);
```

For `.site-header`: Sets the background colour or gradient: `rgba(255, 250, 240, 0.92)`.

### Line 73

```css
  border-bottom: 1px solid rgba(92, 73, 50, 0.1);
```

For `.site-header`: Sets the bottom border: `1px solid rgba(92, 73, 50, 0.1)`.

### Line 74

```css
  backdrop-filter: blur(16px);
```

For `.site-header`: Blurs content behind the translucent element: `blur(16px)`.

### Line 75

```css
}
```

Ends the declarations for `.site-header`.

### Line 76

```css

```

Blank line for readability; no visible effect.

### Line 77

```css
.nav-shell {
```

Targets `.nav-shell`.

### Line 78

```css
  width: min(1180px, calc(100% - 40px));
```

For `.nav-shell`: Sets element width: `min(1180px, calc(100% - 40px))`. min(...) chooses the smaller computed value. calc(...) evaluates the size arithmetic.

### Line 79

```css
  min-height: 78px;
```

For `.nav-shell`: Sets a minimum height: `78px`.

### Line 80

```css
  margin: 0 auto;
```

For `.nav-shell`: Sets space outside the element: `0 auto`. Shorthand order: one value = all sides; two = vertical/horizontal; three = top/horizontal/bottom; four = top/right/bottom/left.

### Line 81

```css
  display: flex;
```

For `.nav-shell`: Chooses the layout mode: `flex`. Arranges direct children with Flexbox.

### Line 82

```css
  align-items: center;
```

For `.nav-shell`: Aligns children on the flex cross-axis or within grid areas: `center`.

### Line 83

```css
  justify-content: space-between;
```

For `.nav-shell`: Distributes children along the flex main axis or distributes grid tracks: `space-between`.

### Line 84

```css
}
```

Ends the declarations for `.nav-shell`.

### Line 85

```css

```

Blank line for readability; no visible effect.

### Line 86

```css
.brand {
```

Targets `.brand`.

### Line 87

```css
  display: inline-flex;
```

For `.brand`: Chooses the layout mode: `inline-flex`. Uses Flexbox internally while participating as an inline-level box.

### Line 88

```css
  align-items: center;
```

For `.brand`: Aligns children on the flex cross-axis or within grid areas: `center`.

### Line 89

```css
  gap: 11px;
```

For `.brand`: Sets space between flex/grid items: `11px`.

### Line 90

```css
  text-decoration: none;
```

For `.brand`: Controls link decoration; none removes the underline: `none`.

### Line 91

```css
  font-family: "Manrope", sans-serif;
```

For `.brand`: Lists the preferred font and fallback fonts in order: `"Manrope", sans-serif`.

### Line 92

```css
  font-size: 1.25rem;
```

For `.brand`: Sets text size: `1.25rem`.

### Line 93

```css
  font-weight: 800;
```

For `.brand`: Sets text weight; larger numbers are usually bolder: `800`.

### Line 94

```css
  letter-spacing: -0.04em;
```

For `.brand`: Adjusts spacing between characters; negative values tighten it: `-0.04em`.

### Line 95

```css
}
```

Ends the declarations for `.brand`.

### Line 96

```css

```

Blank line for readability; no visible effect.

### Line 97

```css
.brand img { transition: transform 220ms ease; }
```

Targets `.brand img`. Animates changes to the listed properties over the stated duration and easing: `transform 220ms ease`.

### Line 98

```css
.brand:hover img { transform: rotate(18deg) scale(1.06); }
```

Targets `.brand:hover img`. Applies while the pointer hovers over the relevant element. Transforms the element: rotates by `18deg`; scales visually without changing layout space by `1.06`.

### Line 99

```css
.brand > span > span { color: var(--green-dark); }
```

Targets `.brand > span > span`. Sets foreground/text colour: `var(--green-dark)`. var(...) reads a shared custom property defined near the start of the file.

### Line 100

```css

```

Blank line for readability; no visible effect.

### Line 101

```css
.nav-links {
```

Targets `.nav-links`.

### Line 102

```css
  display: flex;
```

For `.nav-links`: Chooses the layout mode: `flex`. Arranges direct children with Flexbox.

### Line 103

```css
  align-items: center;
```

For `.nav-links`: Aligns children on the flex cross-axis or within grid areas: `center`.

### Line 104

```css
  gap: 8px;
```

For `.nav-links`: Sets space between flex/grid items: `8px`.

### Line 105

```css
  margin: 0;
```

For `.nav-links`: Sets space outside the element: `0`. Shorthand order: one value = all sides; two = vertical/horizontal; three = top/horizontal/bottom; four = top/right/bottom/left.

### Line 106

```css
  padding: 0;
```

For `.nav-links`: Sets space inside the border: `0`. Shorthand order: one value = all sides; two = vertical/horizontal; three = top/horizontal/bottom; four = top/right/bottom/left.

### Line 107

```css
  list-style: none;
```

For `.nav-links`: Controls list markers; none removes bullets: `none`.

### Line 108

```css
}
```

Ends the declarations for `.nav-links`.

### Line 109

```css

```

Blank line for readability; no visible effect.

### Line 110

```css
.nav-links a {
```

Targets `.nav-links a`.

### Line 111

```css
  position: relative;
```

For `.nav-links a`: Sets positioning behaviour: `relative`. Keeps normal flow and provides a reference for positioned descendants.

### Line 112

```css
  display: block;
```

For `.nav-links a`: Chooses the layout mode: `block`. Uses a block-level box.

### Line 113

```css
  padding: 10px 15px;
```

For `.nav-links a`: Sets space inside the border: `10px 15px`. Shorthand order: one value = all sides; two = vertical/horizontal; three = top/horizontal/bottom; four = top/right/bottom/left.

### Line 114

```css
  border-radius: 999px;
```

For `.nav-links a`: Rounds corners; percentages and slash-separated radii can create circles or organic shapes: `999px`.

### Line 115

```css
  text-decoration: none;
```

For `.nav-links a`: Controls link decoration; none removes the underline: `none`.

### Line 116

```css
  font-weight: 600;
```

For `.nav-links a`: Sets text weight; larger numbers are usually bolder: `600`.

### Line 117

```css
  transition: color 180ms ease, background 180ms ease, transform 180ms ease;
```

For `.nav-links a`: Animates changes to the listed properties over the stated duration and easing: `color 180ms ease, background 180ms ease, transform 180ms ease`.

### Line 118

```css
}
```

Ends the declarations for `.nav-links a`.

### Line 119

```css

```

Blank line for readability; no visible effect.

### Line 120

```css
.nav-links a:hover { color: var(--green-dark); background: var(--green-pale); transform: translateY(-2px); }
```

Targets `.nav-links a:hover`. Applies while the pointer hovers over the relevant element. Sets foreground/text colour: `var(--green-dark)`. var(...) reads a shared custom property defined near the start of the file. Sets the background colour or gradient: `var(--green-pale)`. var(...) reads a shared custom property defined near the start of the file. Transforms the element: moves vertically (negative is upward) by `-2px`.

### Line 121

```css
.nav-links a[aria-current="page"] { color: var(--white); background: var(--navy); }
```

Targets `.nav-links a[aria-current="page"]`. Styles the navigation link JavaScript marks as the current page. Sets foreground/text colour: `var(--white)`. var(...) reads a shared custom property defined near the start of the file. Sets the background colour or gradient: `var(--navy)`. var(...) reads a shared custom property defined near the start of the file.

### Line 122

```css

```

Blank line for readability; no visible effect.

### Line 123

```css
.menu-toggle { display: none; }
```

Targets `.menu-toggle`. Chooses the layout mode: `none`. Hides the element and removes its layout space.

### Line 124

```css

```

Blank line for readability; no visible effect.

### Line 125

```css
main { overflow: hidden; }
```

Targets `main`. Controls content outside the box; hidden clips it: `hidden`.

### Line 126

```css

```

Blank line for readability; no visible effect.

### Line 127

```css
.hero, .page-banner, .about-hero, .content-section, .process-section, .callout, .info-note {
```

Targets `.hero, .page-banner, .about-hero, .content-section, .process-section, .callout, .info-note`.

### Line 128

```css
  width: min(1180px, calc(100% - 40px));
```

For `.hero, .page-banner, .about-hero, .content-section, .process-section, .callout, .info-note`: Sets element width: `min(1180px, calc(100% - 40px))`. min(...) chooses the smaller computed value. calc(...) evaluates the size arithmetic.

### Line 129

```css
  margin-inline: auto;
```

For `.hero, .page-banner, .about-hero, .content-section, .process-section, .callout, .info-note`: Sets outside space on the inline sides; auto centres a constrained block here: `auto`.

### Line 130

```css
}
```

Ends the declarations for `.hero, .page-banner, .about-hero, .content-section, .process-section, .callout, .info-note`.

### Line 131

```css

```

Blank line for readability; no visible effect.

### Line 132

```css
.hero {
```

Targets `.hero`.

### Line 133

```css
  min-height: 680px;
```

For `.hero`: Sets a minimum height: `680px`.

### Line 134

```css
  display: grid;
```

For `.hero`: Chooses the layout mode: `grid`. Arranges direct children in a grid.

### Line 135

```css
  grid-template-columns: 1.04fr 0.96fr;
```

For `.hero`: Defines grid columns; fr shares available space proportionally: `1.04fr 0.96fr`.

### Line 136

```css
  align-items: center;
```

For `.hero`: Aligns children on the flex cross-axis or within grid areas: `center`.

### Line 137

```css
  gap: 70px;
```

For `.hero`: Sets space between flex/grid items: `70px`.

### Line 138

```css
  padding: 82px 0 100px;
```

For `.hero`: Sets space inside the border: `82px 0 100px`. Shorthand order: one value = all sides; two = vertical/horizontal; three = top/horizontal/bottom; four = top/right/bottom/left.

### Line 139

```css
}
```

Ends the declarations for `.hero`.

### Line 140

```css

```

Blank line for readability; no visible effect.

### Line 141

```css
.eyebrow {
```

Targets `.eyebrow`.

### Line 142

```css
  margin-bottom: 20px;
```

For `.eyebrow`: Sets outside space below: `20px`.

### Line 143

```css
  color: var(--green-dark);
```

For `.eyebrow`: Sets foreground/text colour: `var(--green-dark)`. var(...) reads a shared custom property defined near the start of the file.

### Line 144

```css
  font-size: 0.76rem;
```

For `.eyebrow`: Sets text size: `0.76rem`.

### Line 145

```css
  font-weight: 800;
```

For `.eyebrow`: Sets text weight; larger numbers are usually bolder: `800`.

### Line 146

```css
  letter-spacing: 0.16em;
```

For `.eyebrow`: Adjusts spacing between characters; negative values tighten it: `0.16em`.

### Line 147

```css
  text-transform: uppercase;
```

For `.eyebrow`: Changes displayed letter case without changing source text: `uppercase`.

### Line 148

```css
}
```

Ends the declarations for `.eyebrow`.

### Line 149

```css

```

Blank line for readability; no visible effect.

### Line 150

```css
.hero h1 { margin-bottom: 28px; }
```

Targets `.hero h1`. Sets outside space below: `28px`.

### Line 151

```css
.hero-lead { max-width: 620px; color: var(--ink-muted); font-size: 1.16rem; }
```

Targets `.hero-lead`. Limits maximum width: `620px`. Sets foreground/text colour: `var(--ink-muted)`. var(...) reads a shared custom property defined near the start of the file. Sets text size: `1.16rem`.

### Line 152

```css
.hero-actions { display: flex; align-items: center; gap: 28px; margin-top: 38px; }
```

Targets `.hero-actions`. Chooses the layout mode: `flex`. Arranges direct children with Flexbox. Aligns children on the flex cross-axis or within grid areas: `center`. Sets space between flex/grid items: `28px`. Sets outside space above: `38px`.

### Line 153

```css

```

Blank line for readability; no visible effect.

### Line 154

```css
.button {
```

Targets `.button`.

### Line 155

```css
  display: inline-flex;
```

For `.button`: Chooses the layout mode: `inline-flex`. Uses Flexbox internally while participating as an inline-level box.

### Line 156

```css
  align-items: center;
```

For `.button`: Aligns children on the flex cross-axis or within grid areas: `center`.

### Line 157

```css
  justify-content: center;
```

For `.button`: Distributes children along the flex main axis or distributes grid tracks: `center`.

### Line 158

```css
  gap: 12px;
```

For `.button`: Sets space between flex/grid items: `12px`.

### Line 159

```css
  min-height: 52px;
```

For `.button`: Sets a minimum height: `52px`.

### Line 160

```css
  padding: 0 24px;
```

For `.button`: Sets space inside the border: `0 24px`. Shorthand order: one value = all sides; two = vertical/horizontal; three = top/horizontal/bottom; four = top/right/bottom/left.

### Line 161

```css
  border: 0;
```

For `.button`: Sets border thickness, style, and colour; 0 removes it: `0`.

### Line 162

```css
  border-radius: 8px;
```

For `.button`: Rounds corners; percentages and slash-separated radii can create circles or organic shapes: `8px`.

### Line 163

```css
  text-decoration: none;
```

For `.button`: Controls link decoration; none removes the underline: `none`.

### Line 164

```css
  font: 700 0.96rem "DM Sans", sans-serif;
```

For `.button`: Sets several font properties together, or inherits them from the parent: `700 0.96rem "DM Sans", sans-serif`.

### Line 165

```css
  cursor: pointer;
```

For `.button`: Chooses the pointer appearance; pointer signals a clickable control: `pointer`.

### Line 166

```css
  transition: transform 180ms ease, box-shadow 180ms ease, background 180ms ease;
```

For `.button`: Animates changes to the listed properties over the stated duration and easing: `transform 180ms ease, box-shadow 180ms ease, background 180ms ease`.

### Line 167

```css
}
```

Ends the declarations for `.button`.

### Line 168

```css

```

Blank line for readability; no visible effect.

### Line 169

```css
.button:hover { transform: translateY(-3px); }
```

Targets `.button:hover`. Applies while the pointer hovers over the relevant element. Transforms the element: moves vertically (negative is upward) by `-3px`.

### Line 170

```css
.button-primary { color: var(--white); background: var(--green-dark); box-shadow: 0 12px 26px rgba(169, 101, 24, 0.24); }
```

Targets `.button-primary`. Sets foreground/text colour: `var(--white)`. var(...) reads a shared custom property defined near the start of the file. Sets the background colour or gradient: `var(--green-dark)`. var(...) reads a shared custom property defined near the start of the file. Adds a shadow using offsets, blur, and colour: `0 12px 26px rgba(169, 101, 24, 0.24)`.

### Line 171

```css
.button-primary:hover { background: #87500e; box-shadow: 0 15px 32px rgba(169, 101, 24, 0.33); }
```

Targets `.button-primary:hover`. Applies while the pointer hovers over the relevant element. Sets the background colour or gradient: `#87500e`. Adds a shadow using offsets, blur, and colour: `0 15px 32px rgba(169, 101, 24, 0.33)`.

### Line 172

```css
.button-light { color: var(--navy); background: var(--white); }
```

Targets `.button-light`. Sets foreground/text colour: `var(--navy)`. var(...) reads a shared custom property defined near the start of the file. Sets the background colour or gradient: `var(--white)`. var(...) reads a shared custom property defined near the start of the file.

### Line 173

```css
.text-link { font-weight: 700; text-underline-offset: 6px; text-decoration-color: var(--green); }
```

Targets `.text-link`. Sets text weight; larger numbers are usually bolder: `700`. Sets the distance of an underline from text: `6px`. Sets underline/decoration colour: `var(--green)`. var(...) reads a shared custom property defined near the start of the file.

### Line 174

```css
.text-link:hover { color: var(--green-dark); }
```

Targets `.text-link:hover`. Applies while the pointer hovers over the relevant element. Sets foreground/text colour: `var(--green-dark)`. var(...) reads a shared custom property defined near the start of the file.

### Line 175

```css

```

Blank line for readability; no visible effect.

### Line 176

```css
.hero-visual { position: relative; min-height: 500px; display: grid; place-items: center; }
```

Targets `.hero-visual`. Sets positioning behaviour: `relative`. Keeps normal flow and provides a reference for positioned descendants. Sets a minimum height: `500px`. Chooses the layout mode: `grid`. Arranges direct children in a grid. Sets both align-items and justify-items; center centres items in their grid areas: `center`.

### Line 177

```css
.energy-orbit { position: absolute; border: 1px solid rgba(169, 101, 24, 0.25); border-radius: 50%; }
```

Targets `.energy-orbit`. Sets positioning behaviour: `absolute`. Removes the element from normal flow and positions it relative to its containing block. Sets border thickness, style, and colour; 0 removes it: `1px solid rgba(169, 101, 24, 0.25)`. Rounds corners; percentages and slash-separated radii can create circles or organic shapes: `50%`.

### Line 178

```css
.orbit-one { width: 460px; height: 460px; }
```

Targets `.orbit-one`. Sets element width: `460px`. Sets element height: `460px`.

### Line 179

```css
.orbit-two { width: 350px; height: 350px; border-style: dashed; animation: spin 28s linear infinite; }
```

Targets `.orbit-two`. Sets element width: `350px`. Sets element height: `350px`. Changes the line style of the border: `dashed`. Runs the named keyframe animation with the specified duration, timing, and repeat count: `spin 28s linear infinite`.

### Line 180

```css

```

Blank line for readability; no visible effect.

### Line 181

```css
.power-card {
```

Targets `.power-card`.

### Line 182

```css
  position: relative;
```

For `.power-card`: Sets positioning behaviour: `relative`. Keeps normal flow and provides a reference for positioned descendants.

### Line 183

```css
  z-index: 2;
```

For `.power-card`: Sets stacking order within the relevant stacking context: `2`.

### Line 184

```css
  width: 290px;
```

For `.power-card`: Sets element width: `290px`.

### Line 185

```css
  min-height: 330px;
```

For `.power-card`: Sets a minimum height: `330px`.

### Line 186

```css
  padding: 46px 34px;
```

For `.power-card`: Sets space inside the border: `46px 34px`. Shorthand order: one value = all sides; two = vertical/horizontal; three = top/horizontal/bottom; four = top/right/bottom/left.

### Line 187

```css
  display: flex;
```

For `.power-card`: Chooses the layout mode: `flex`. Arranges direct children with Flexbox.

### Line 188

```css
  flex-direction: column;
```

For `.power-card`: Chooses the flex main-axis direction; column stacks children vertically: `column`.

### Line 189

```css
  align-items: center;
```

For `.power-card`: Aligns children on the flex cross-axis or within grid areas: `center`.

### Line 190

```css
  justify-content: center;
```

For `.power-card`: Distributes children along the flex main axis or distributes grid tracks: `center`.

### Line 191

```css
  color: var(--white);
```

For `.power-card`: Sets foreground/text colour: `var(--white)`. var(...) reads a shared custom property defined near the start of the file.

### Line 192

```css
  background: var(--navy);
```

For `.power-card`: Sets the background colour or gradient: `var(--navy)`. var(...) reads a shared custom property defined near the start of the file.

### Line 193

```css
  border-radius: 50% 50% 46% 54% / 43% 48% 52% 57%;
```

For `.power-card`: Rounds corners; percentages and slash-separated radii can create circles or organic shapes: `50% 50% 46% 54% / 43% 48% 52% 57%`.

### Line 194

```css
  box-shadow: var(--shadow);
```

For `.power-card`: Adds a shadow using offsets, blur, and colour: `var(--shadow)`. var(...) reads a shared custom property defined near the start of the file.

### Line 195

```css
}
```

Ends the declarations for `.power-card`.

### Line 196

```css

```

Blank line for readability; no visible effect.

### Line 197

```css
.power-card img { margin-bottom: 26px; filter: drop-shadow(0 10px 18px rgba(242, 170, 61, 0.22)); }
```

Targets `.power-card img`. Sets outside space below: `26px`. Applies a visual effect; drop-shadow follows the image silhouette: `drop-shadow(0 10px 18px rgba(242, 170, 61, 0.22))`.

### Line 198

```css
.power-card strong { font: 800 1.8rem "Manrope", sans-serif; }
```

Targets `.power-card strong`. Sets several font properties together, or inherits them from the parent: `800 1.8rem "Manrope", sans-serif`.

### Line 199

```css
.power-card span { color: #bfcbd4; }
```

Targets `.power-card span`. Sets foreground/text colour: `#bfcbd4`.

### Line 200

```css

```

Blank line for readability; no visible effect.

### Line 201

```css
.stat-chip {
```

Targets `.stat-chip`.

### Line 202

```css
  position: absolute;
```

For `.stat-chip`: Sets positioning behaviour: `absolute`. Removes the element from normal flow and positions it relative to its containing block.

### Line 203

```css
  z-index: 3;
```

For `.stat-chip`: Sets stacking order within the relevant stacking context: `3`.

### Line 204

```css
  min-width: 158px;
```

For `.stat-chip`: Sets a minimum width: `158px`.

### Line 205

```css
  padding: 15px 18px;
```

For `.stat-chip`: Sets space inside the border: `15px 18px`. Shorthand order: one value = all sides; two = vertical/horizontal; three = top/horizontal/bottom; four = top/right/bottom/left.

### Line 206

```css
  display: flex;
```

For `.stat-chip`: Chooses the layout mode: `flex`. Arranges direct children with Flexbox.

### Line 207

```css
  flex-direction: column;
```

For `.stat-chip`: Chooses the flex main-axis direction; column stacks children vertically: `column`.

### Line 208

```css
  background: var(--white);
```

For `.stat-chip`: Sets the background colour or gradient: `var(--white)`. var(...) reads a shared custom property defined near the start of the file.

### Line 209

```css
  border: 1px solid var(--line);
```

For `.stat-chip`: Sets border thickness, style, and colour; 0 removes it: `1px solid var(--line)`. var(...) reads a shared custom property defined near the start of the file.

### Line 210

```css
  border-radius: 12px;
```

For `.stat-chip`: Rounds corners; percentages and slash-separated radii can create circles or organic shapes: `12px`.

### Line 211

```css
  box-shadow: 0 15px 35px rgba(92, 73, 50, 0.14);
```

For `.stat-chip`: Adds a shadow using offsets, blur, and colour: `0 15px 35px rgba(92, 73, 50, 0.14)`.

### Line 212

```css
}
```

Ends the declarations for `.stat-chip`.

### Line 213

```css

```

Blank line for readability; no visible effect.

### Line 214

```css
.stat-chip strong { color: var(--green-dark); font: 800 1.4rem "Manrope", sans-serif; }
```

Targets `.stat-chip strong`. Sets foreground/text colour: `var(--green-dark)`. var(...) reads a shared custom property defined near the start of the file. Sets several font properties together, or inherits them from the parent: `800 1.4rem "Manrope", sans-serif`.

### Line 215

```css
.stat-chip span { color: var(--ink-muted); font-size: 0.8rem; }
```

Targets `.stat-chip span`. Sets foreground/text colour: `var(--ink-muted)`. var(...) reads a shared custom property defined near the start of the file. Sets text size: `0.8rem`.

### Line 216

```css
.stat-chip-top { top: 70px; right: 0; }
```

Targets `.stat-chip-top`. Sets the top positioning offset: `70px`. Sets the right positioning offset: `0`.

### Line 217

```css
.stat-chip-bottom { bottom: 65px; left: 0; }
```

Targets `.stat-chip-bottom`. Sets the bottom positioning offset: `65px`. Sets the left positioning offset: `0`.

### Line 218

```css

```

Blank line for readability; no visible effect.

### Line 219

```css
.content-section { padding: 110px 0; }
```

Targets `.content-section`. Sets space inside the border: `110px 0`. Shorthand order: one value = all sides; two = vertical/horizontal; three = top/horizontal/bottom; four = top/right/bottom/left.

### Line 220

```css
.section-heading { max-width: 700px; margin-bottom: 52px; }
```

Targets `.section-heading`. Limits maximum width: `700px`. Sets outside space below: `52px`.

### Line 221

```css
.section-heading h2 { margin-bottom: 20px; }
```

Targets `.section-heading h2`. Sets outside space below: `20px`.

### Line 222

```css
.section-heading > p:last-child { color: var(--ink-muted); font-size: 1.08rem; }
```

Targets `.section-heading > p:last-child`. Sets foreground/text colour: `var(--ink-muted)`. var(...) reads a shared custom property defined near the start of the file. Sets text size: `1.08rem`.

### Line 223

```css

```

Blank line for readability; no visible effect.

### Line 224

```css
.feature-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
```

Targets `.feature-grid`. Chooses the layout mode: `grid`. Arranges direct children in a grid. Defines grid columns; fr shares available space proportionally: `repeat(3, 1fr)`. Sets space between flex/grid items: `20px`.

### Line 225

```css
.feature-card { min-height: 275px; padding: 34px; background: var(--white); border: 1px solid var(--line); border-radius: 14px; transition: transform 220ms ease, box-shadow 220ms ease; }
```

Targets `.feature-card`. Sets a minimum height: `275px`. Sets space inside the border: `34px`. Shorthand order: one value = all sides; two = vertical/horizontal; three = top/horizontal/bottom; four = top/right/bottom/left. Sets the background colour or gradient: `var(--white)`. var(...) reads a shared custom property defined near the start of the file. Sets border thickness, style, and colour; 0 removes it: `1px solid var(--line)`. var(...) reads a shared custom property defined near the start of the file. Rounds corners; percentages and slash-separated radii can create circles or organic shapes: `14px`. Animates changes to the listed properties over the stated duration and easing: `transform 220ms ease, box-shadow 220ms ease`.

### Line 226

```css
.feature-card:hover { transform: translateY(-8px); box-shadow: var(--shadow); }
```

Targets `.feature-card:hover`. Applies while the pointer hovers over the relevant element. Transforms the element: moves vertically (negative is upward) by `-8px`. Adds a shadow using offsets, blur, and colour: `var(--shadow)`. var(...) reads a shared custom property defined near the start of the file.

### Line 227

```css
.card-number { color: var(--green-dark); font-weight: 800; }
```

Targets `.card-number`. Sets foreground/text colour: `var(--green-dark)`. var(...) reads a shared custom property defined near the start of the file. Sets text weight; larger numbers are usually bolder: `800`.

### Line 228

```css
.feature-card h3 { margin: 70px 0 14px; font-size: 1.4rem; }
```

Targets `.feature-card h3`. Sets space outside the element: `70px 0 14px`. Shorthand order: one value = all sides; two = vertical/horizontal; three = top/horizontal/bottom; four = top/right/bottom/left. Sets text size: `1.4rem`.

### Line 229

```css
.feature-card p { color: var(--ink-muted); margin: 0; }
```

Targets `.feature-card p`. Sets foreground/text colour: `var(--ink-muted)`. var(...) reads a shared custom property defined near the start of the file. Sets space outside the element: `0`. Shorthand order: one value = all sides; two = vertical/horizontal; three = top/horizontal/bottom; four = top/right/bottom/left.

### Line 230

```css

```

Blank line for readability; no visible effect.

### Line 231

```css
.callout {
```

Targets `.callout`.

### Line 232

```css
  margin-bottom: 110px;
```

For `.callout`: Sets outside space below: `110px`.

### Line 233

```css
  padding: 52px 58px;
```

For `.callout`: Sets space inside the border: `52px 58px`. Shorthand order: one value = all sides; two = vertical/horizontal; three = top/horizontal/bottom; four = top/right/bottom/left.

### Line 234

```css
  display: flex;
```

For `.callout`: Chooses the layout mode: `flex`. Arranges direct children with Flexbox.

### Line 235

```css
  align-items: center;
```

For `.callout`: Aligns children on the flex cross-axis or within grid areas: `center`.

### Line 236

```css
  justify-content: space-between;
```

For `.callout`: Distributes children along the flex main axis or distributes grid tracks: `space-between`.

### Line 237

```css
  gap: 30px;
```

For `.callout`: Sets space between flex/grid items: `30px`.

### Line 238

```css
  color: var(--white);
```

For `.callout`: Sets foreground/text colour: `var(--white)`. var(...) reads a shared custom property defined near the start of the file.

### Line 239

```css
  background: var(--green-dark);
```

For `.callout`: Sets the background colour or gradient: `var(--green-dark)`. var(...) reads a shared custom property defined near the start of the file.

### Line 240

```css
  border-radius: 18px;
```

For `.callout`: Rounds corners; percentages and slash-separated radii can create circles or organic shapes: `18px`.

### Line 241

```css
}
```

Ends the declarations for `.callout`.

### Line 242

```css
.callout .eyebrow { color: #fff0b9; }
```

Targets `.callout .eyebrow`. Sets foreground/text colour: `#fff0b9`.

### Line 243

```css
.callout h2 { max-width: 660px; margin: 0; }
```

Targets `.callout h2`. Limits maximum width: `660px`. Sets space outside the element: `0`. Shorthand order: one value = all sides; two = vertical/horizontal; three = top/horizontal/bottom; four = top/right/bottom/left.

### Line 244

```css

```

Blank line for readability; no visible effect.

### Line 245

```css
.page-banner {
```

Targets `.page-banner`.

### Line 246

```css
  min-height: 510px;
```

For `.page-banner`: Sets a minimum height: `510px`.

### Line 247

```css
  padding: 75px 0;
```

For `.page-banner`: Sets space inside the border: `75px 0`. Shorthand order: one value = all sides; two = vertical/horizontal; three = top/horizontal/bottom; four = top/right/bottom/left.

### Line 248

```css
  display: grid;
```

For `.page-banner`: Chooses the layout mode: `grid`. Arranges direct children in a grid.

### Line 249

```css
  grid-template-columns: 1fr 0.8fr;
```

For `.page-banner`: Defines grid columns; fr shares available space proportionally: `1fr 0.8fr`.

### Line 250

```css
  align-items: center;
```

For `.page-banner`: Aligns children on the flex cross-axis or within grid areas: `center`.

### Line 251

```css
  gap: 70px;
```

For `.page-banner`: Sets space between flex/grid items: `70px`.

### Line 252

```css
}
```

Ends the declarations for `.page-banner`.

### Line 253

```css
.page-banner h1 { margin-bottom: 25px; }
```

Targets `.page-banner h1`. Sets outside space below: `25px`.

### Line 254

```css
.page-banner > div:first-child > p:last-child { max-width: 610px; color: var(--ink-muted); font-size: 1.1rem; }
```

Targets `.page-banner > div:first-child > p:last-child`. Limits maximum width: `610px`. Sets foreground/text colour: `var(--ink-muted)`. var(...) reads a shared custom property defined near the start of the file. Sets text size: `1.1rem`.

### Line 255

```css
.tv-illustration { display: grid; place-items: center; }
```

Targets `.tv-illustration`. Chooses the layout mode: `grid`. Arranges direct children in a grid. Sets both align-items and justify-items; center centres items in their grid areas: `center`.

### Line 256

```css
.tv-screen { width: min(420px, 100%); aspect-ratio: 16 / 10; display: flex; flex-direction: column; align-items: center; justify-content: center; color: var(--white); background: linear-gradient(145deg, var(--navy-soft), var(--navy)); border: 13px solid #423321; border-radius: 18px; box-shadow: var(--shadow); }
```

Targets `.tv-screen`. Sets element width: `min(420px, 100%)`. min(...) chooses the smaller computed value. Sets the preferred width-to-height ratio: `16 / 10`. Chooses the layout mode: `flex`. Arranges direct children with Flexbox. Chooses the flex main-axis direction; column stacks children vertically: `column`. Aligns children on the flex cross-axis or within grid areas: `center`. Distributes children along the flex main axis or distributes grid tracks: `center`. Sets foreground/text colour: `var(--white)`. var(...) reads a shared custom property defined near the start of the file. Sets the background colour or gradient: `linear-gradient(145deg, var(--navy-soft), var(--navy))`. var(...) reads a shared custom property defined near the start of the file. Sets border thickness, style, and colour; 0 removes it: `13px solid #423321`. Rounds corners; percentages and slash-separated radii can create circles or organic shapes: `18px`. Adds a shadow using offsets, blur, and colour: `var(--shadow)`. var(...) reads a shared custom property defined near the start of the file.

### Line 257

```css
.tv-screen span { color: #b9c8d3; font-size: 0.7rem; letter-spacing: 0.24em; }
```

Targets `.tv-screen span`. Sets foreground/text colour: `#b9c8d3`. Sets text size: `0.7rem`. Adjusts spacing between characters; negative values tighten it: `0.24em`.

### Line 258

```css
.tv-screen strong { margin-top: 12px; color: var(--green); font-size: clamp(1rem, 3vw, 2rem); letter-spacing: 0.16em; }
```

Targets `.tv-screen strong`. Sets outside space above: `12px`. Sets foreground/text colour: `var(--green)`. var(...) reads a shared custom property defined near the start of the file. Sets text size: `clamp(1rem, 3vw, 2rem)`. clamp(minimum, preferred, maximum) lets the preferred size vary within limits. Adjusts spacing between characters; negative values tighten it: `0.16em`.

### Line 259

```css
.tv-stand { width: 45%; height: 60px; border-bottom: 12px solid var(--navy); clip-path: polygon(42% 0, 58% 0, 70% 80%, 100% 80%, 100% 100%, 0 100%, 0 80%, 30% 80%); }
```

Targets `.tv-stand`. Sets element width: `45%`. Sets element height: `60px`. Sets the bottom border: `12px solid var(--navy)`. var(...) reads a shared custom property defined near the start of the file. Clips visible painting to the given polygon, shaping the TV stand: `polygon(42% 0, 58% 0, 70% 80%, 100% 80%, 100% 100%, 0 100%, 0 80%, 30% 80%)`.

### Line 260

```css

```

Blank line for readability; no visible effect.

### Line 261

```css
.split-section { display: grid; grid-template-columns: 0.9fr 1.1fr; gap: 80px; align-items: start; }
```

Targets `.split-section`. Chooses the layout mode: `grid`. Arranges direct children in a grid. Defines grid columns; fr shares available space proportionally: `0.9fr 1.1fr`. Sets space between flex/grid items: `80px`. Aligns children on the flex cross-axis or within grid areas: `start`.

### Line 262

```css
.calculator-card { padding: 42px; color: var(--white); background: var(--navy); border-radius: 18px; box-shadow: var(--shadow); }
```

Targets `.calculator-card`. Sets space inside the border: `42px`. Shorthand order: one value = all sides; two = vertical/horizontal; three = top/horizontal/bottom; four = top/right/bottom/left. Sets foreground/text colour: `var(--white)`. var(...) reads a shared custom property defined near the start of the file. Sets the background colour or gradient: `var(--navy)`. var(...) reads a shared custom property defined near the start of the file. Rounds corners; percentages and slash-separated radii can create circles or organic shapes: `18px`. Adds a shadow using offsets, blur, and colour: `var(--shadow)`. var(...) reads a shared custom property defined near the start of the file.

### Line 263

```css
.calculator-card .eyebrow { color: #ffd77f; }
```

Targets `.calculator-card .eyebrow`. Sets foreground/text colour: `#ffd77f`.

### Line 264

```css
.calculator-card h2 { font-size: 2.4rem; }
```

Targets `.calculator-card h2`. Sets text size: `2.4rem`.

### Line 265

```css
.calculator-card form { display: grid; gap: 10px; }
```

Targets `.calculator-card form`. Chooses the layout mode: `grid`. Arranges direct children in a grid. Sets space between flex/grid items: `10px`.

### Line 266

```css
.calculator-card label { display: flex; justify-content: space-between; margin-top: 10px; font-weight: 600; }
```

Targets `.calculator-card label`. Chooses the layout mode: `flex`. Arranges direct children with Flexbox. Distributes children along the flex main axis or distributes grid tracks: `space-between`. Sets outside space above: `10px`. Sets text weight; larger numbers are usually bolder: `600`.

### Line 267

```css
.calculator-card label span { color: #a8b7c2; font-size: 0.85rem; font-weight: 400; }
```

Targets `.calculator-card label span`. Sets foreground/text colour: `#a8b7c2`. Sets text size: `0.85rem`. Sets text weight; larger numbers are usually bolder: `400`.

### Line 268

```css
.calculator-card input { width: 100%; padding: 13px 15px; color: var(--navy); background: var(--white); border: 2px solid transparent; border-radius: 7px; font: inherit; }
```

Targets `.calculator-card input`. Sets element width: `100%`. Sets space inside the border: `13px 15px`. Shorthand order: one value = all sides; two = vertical/horizontal; three = top/horizontal/bottom; four = top/right/bottom/left. Sets foreground/text colour: `var(--navy)`. var(...) reads a shared custom property defined near the start of the file. Sets the background colour or gradient: `var(--white)`. var(...) reads a shared custom property defined near the start of the file. Sets border thickness, style, and colour; 0 removes it: `2px solid transparent`. Rounds corners; percentages and slash-separated radii can create circles or organic shapes: `7px`. Sets several font properties together, or inherits them from the parent: `inherit`.

### Line 269

```css
.calculator-card input:focus { border-color: var(--green); outline: 3px solid rgba(242, 170, 61, 0.22); }
```

Targets `.calculator-card input:focus`. Applies when the element has keyboard or input focus. Changes border colour: `var(--green)`. var(...) reads a shared custom property defined near the start of the file. Draws a focus indicator outside the border: `3px solid rgba(242, 170, 61, 0.22)`.

### Line 270

```css
.calculator-card button { margin-top: 16px; width: 100%; }
```

Targets `.calculator-card button`. Sets outside space above: `16px`. Sets element width: `100%`.

### Line 271

```css
.result-panel { margin-top: 25px; padding: 24px; display: flex; flex-direction: column; background: var(--navy-soft); border-left: 4px solid var(--green); border-radius: 5px; }
```

Targets `.result-panel`. Sets outside space above: `25px`. Sets space inside the border: `24px`. Shorthand order: one value = all sides; two = vertical/horizontal; three = top/horizontal/bottom; four = top/right/bottom/left. Chooses the layout mode: `flex`. Arranges direct children with Flexbox. Chooses the flex main-axis direction; column stacks children vertically: `column`. Sets the background colour or gradient: `var(--navy-soft)`. var(...) reads a shared custom property defined near the start of the file. Sets the left border: `4px solid var(--green)`. var(...) reads a shared custom property defined near the start of the file. Rounds corners; percentages and slash-separated radii can create circles or organic shapes: `5px`.

### Line 272

```css
.result-panel span, .result-panel small { color: #b9c8d3; }
```

Targets `.result-panel span, .result-panel small`. Sets foreground/text colour: `#b9c8d3`.

### Line 273

```css
.result-panel strong { margin: 3px 0; color: var(--green); font: 800 2.2rem "Manrope", sans-serif; }
```

Targets `.result-panel strong`. Sets space outside the element: `3px 0`. Shorthand order: one value = all sides; two = vertical/horizontal; three = top/horizontal/bottom; four = top/right/bottom/left. Sets foreground/text colour: `var(--green)`. var(...) reads a shared custom property defined near the start of the file. Sets several font properties together, or inherits them from the parent: `800 2.2rem "Manrope", sans-serif`.

### Line 274

```css
.tips-panel h2 { margin-bottom: 38px; }
```

Targets `.tips-panel h2`. Sets outside space below: `38px`.

### Line 275

```css
.tip-list { display: grid; gap: 7px; }
```

Targets `.tip-list`. Chooses the layout mode: `grid`. Arranges direct children in a grid. Sets space between flex/grid items: `7px`.

### Line 276

```css
.tip-list article { padding: 22px 0; display: grid; grid-template-columns: 48px 1fr; gap: 15px; border-top: 1px solid var(--line); }
```

Targets `.tip-list article`. Sets space inside the border: `22px 0`. Shorthand order: one value = all sides; two = vertical/horizontal; three = top/horizontal/bottom; four = top/right/bottom/left. Chooses the layout mode: `grid`. Arranges direct children in a grid. Defines grid columns; fr shares available space proportionally: `48px 1fr`. Sets space between flex/grid items: `15px`. Sets the top border: `1px solid var(--line)`. var(...) reads a shared custom property defined near the start of the file.

### Line 277

```css
.tip-list article > span { color: var(--green-dark); font-weight: 800; }
```

Targets `.tip-list article > span`. Sets foreground/text colour: `var(--green-dark)`. var(...) reads a shared custom property defined near the start of the file. Sets text weight; larger numbers are usually bolder: `800`.

### Line 278

```css
.tip-list h3 { margin-bottom: 7px; }
```

Targets `.tip-list h3`. Sets outside space below: `7px`.

### Line 279

```css
.tip-list p { margin: 0; color: var(--ink-muted); }
```

Targets `.tip-list p`. Sets space outside the element: `0`. Shorthand order: one value = all sides; two = vertical/horizontal; three = top/horizontal/bottom; four = top/right/bottom/left. Sets foreground/text colour: `var(--ink-muted)`. var(...) reads a shared custom property defined near the start of the file.

### Line 280

```css
.info-note { margin-bottom: 110px; padding: 26px 30px; display: flex; gap: 35px; background: var(--green-pale); border-radius: 10px; }
```

Targets `.info-note`. Sets outside space below: `110px`. Sets space inside the border: `26px 30px`. Shorthand order: one value = all sides; two = vertical/horizontal; three = top/horizontal/bottom; four = top/right/bottom/left. Chooses the layout mode: `flex`. Arranges direct children with Flexbox. Sets space between flex/grid items: `35px`. Sets the background colour or gradient: `var(--green-pale)`. var(...) reads a shared custom property defined near the start of the file. Rounds corners; percentages and slash-separated radii can create circles or organic shapes: `10px`.

### Line 281

```css
.info-note p { margin: 0; color: var(--ink-muted); }
```

Targets `.info-note p`. Sets space outside the element: `0`. Shorthand order: one value = all sides; two = vertical/horizontal; three = top/horizontal/bottom; four = top/right/bottom/left. Sets foreground/text colour: `var(--ink-muted)`. var(...) reads a shared custom property defined near the start of the file.

### Line 282

```css

```

Blank line for readability; no visible effect.

### Line 283

```css
.chart-section { width: min(1180px, calc(100% - 40px)); margin: 0 auto; padding: 20px 0 110px; }
```

Targets `.chart-section`. Sets element width: `min(1180px, calc(100% - 40px))`. min(...) chooses the smaller computed value. calc(...) evaluates the size arithmetic. Sets space outside the element: `0 auto`. Shorthand order: one value = all sides; two = vertical/horizontal; three = top/horizontal/bottom; four = top/right/bottom/left. Sets space inside the border: `20px 0 110px`. Shorthand order: one value = all sides; two = vertical/horizontal; three = top/horizontal/bottom; four = top/right/bottom/left.

### Line 284

```css
.chart-gallery { display: grid; gap: 28px; }
```

Targets `.chart-gallery`. Chooses the layout mode: `grid`. Arranges direct children in a grid. Sets space between flex/grid items: `28px`.

### Line 285

```css
.chart-card { margin: 0; overflow: hidden; background: var(--white); border: 1px solid var(--line); border-radius: 16px; box-shadow: 0 12px 35px rgba(92, 73, 50, 0.08); }
```

Targets `.chart-card`. Sets space outside the element: `0`. Shorthand order: one value = all sides; two = vertical/horizontal; three = top/horizontal/bottom; four = top/right/bottom/left. Controls content outside the box; hidden clips it: `hidden`. Sets the background colour or gradient: `var(--white)`. var(...) reads a shared custom property defined near the start of the file. Sets border thickness, style, and colour; 0 removes it: `1px solid var(--line)`. var(...) reads a shared custom property defined near the start of the file. Rounds corners; percentages and slash-separated radii can create circles or organic shapes: `16px`. Adds a shadow using offsets, blur, and colour: `0 12px 35px rgba(92, 73, 50, 0.08)`.

### Line 286

```css
.chart-card img { display: block; width: 100%; height: auto; border-bottom: 1px solid var(--line); }
```

Targets `.chart-card img`. Chooses the layout mode: `block`. Uses a block-level box. Sets element width: `100%`. Sets element height: `auto`. Sets the bottom border: `1px solid var(--line)`. var(...) reads a shared custom property defined near the start of the file.

### Line 287

```css
.chart-card figcaption { padding: 24px 28px; display: flex; align-items: baseline; justify-content: space-between; gap: 30px; }
```

Targets `.chart-card figcaption`. Sets space inside the border: `24px 28px`. Shorthand order: one value = all sides; two = vertical/horizontal; three = top/horizontal/bottom; four = top/right/bottom/left. Chooses the layout mode: `flex`. Arranges direct children with Flexbox. Aligns children on the flex cross-axis or within grid areas: `baseline`. Distributes children along the flex main axis or distributes grid tracks: `space-between`. Sets space between flex/grid items: `30px`.

### Line 288

```css
.chart-card figcaption strong { font: 800 1.15rem "Manrope", sans-serif; }
```

Targets `.chart-card figcaption strong`. Sets several font properties together, or inherits them from the parent: `800 1.15rem "Manrope", sans-serif`.

### Line 289

```css
.chart-card figcaption span { max-width: 620px; color: var(--ink-muted); text-align: right; }
```

Targets `.chart-card figcaption span`. Limits maximum width: `620px`. Sets foreground/text colour: `var(--ink-muted)`. var(...) reads a shared custom property defined near the start of the file. Aligns inline text within its container: `right`.

### Line 290

```css

```

Blank line for readability; no visible effect.

### Line 291

```css
.about-hero { padding: 105px 0 95px; display: grid; grid-template-columns: 1.2fr 0.8fr; gap: 80px; align-items: end; border-bottom: 1px solid var(--line); }
```

Targets `.about-hero`. Sets space inside the border: `105px 0 95px`. Shorthand order: one value = all sides; two = vertical/horizontal; three = top/horizontal/bottom; four = top/right/bottom/left. Chooses the layout mode: `grid`. Arranges direct children in a grid. Defines grid columns; fr shares available space proportionally: `1.2fr 0.8fr`. Sets space between flex/grid items: `80px`. Aligns children on the flex cross-axis or within grid areas: `end`. Sets the bottom border: `1px solid var(--line)`. var(...) reads a shared custom property defined near the start of the file.

### Line 292

```css
.about-hero h1 { margin: 0; }
```

Targets `.about-hero h1`. Sets space outside the element: `0`. Shorthand order: one value = all sides; two = vertical/horizontal; three = top/horizontal/bottom; four = top/right/bottom/left.

### Line 293

```css
.about-intro { margin: 0 0 15px; color: var(--ink-muted); font-size: 1.16rem; }
```

Targets `.about-intro`. Sets space outside the element: `0 0 15px`. Shorthand order: one value = all sides; two = vertical/horizontal; three = top/horizontal/bottom; four = top/right/bottom/left. Sets foreground/text colour: `var(--ink-muted)`. var(...) reads a shared custom property defined near the start of the file. Sets text size: `1.16rem`.

### Line 294

```css
.about-grid { display: grid; grid-template-columns: 1fr 0.8fr; gap: 90px; }
```

Targets `.about-grid`. Chooses the layout mode: `grid`. Arranges direct children in a grid. Defines grid columns; fr shares available space proportionally: `1fr 0.8fr`. Sets space between flex/grid items: `90px`.

### Line 295

```css
.mission-card { padding: 52px; color: var(--white); background: var(--navy); border-radius: 18px; }
```

Targets `.mission-card`. Sets space inside the border: `52px`. Shorthand order: one value = all sides; two = vertical/horizontal; three = top/horizontal/bottom; four = top/right/bottom/left. Sets foreground/text colour: `var(--white)`. var(...) reads a shared custom property defined near the start of the file. Sets the background colour or gradient: `var(--navy)`. var(...) reads a shared custom property defined near the start of the file. Rounds corners; percentages and slash-separated radii can create circles or organic shapes: `18px`.

### Line 296

```css
.mission-card .eyebrow { color: #ffd77f; }
```

Targets `.mission-card .eyebrow`. Sets foreground/text colour: `#ffd77f`.

### Line 297

```css
.mission-card h2 { font-size: clamp(2rem, 4vw, 3.1rem); }
```

Targets `.mission-card h2`. Sets text size: `clamp(2rem, 4vw, 3.1rem)`. clamp(minimum, preferred, maximum) lets the preferred size vary within limits.

### Line 298

```css
.mission-card > p:last-child { color: #bdcad3; }
```

Targets `.mission-card > p:last-child`. Sets foreground/text colour: `#bdcad3`.

### Line 299

```css
.large-icon { display: block; margin-bottom: 50px; color: var(--green); font-size: 4rem; line-height: 1; }
```

Targets `.large-icon`. Chooses the layout mode: `block`. Uses a block-level box. Sets outside space below: `50px`. Sets foreground/text colour: `var(--green)`. var(...) reads a shared custom property defined near the start of the file. Sets text size: `4rem`. Sets line spacing; a unitless number multiplies font size: `1`.

### Line 300

```css
.values-list article { padding: 30px 0; display: grid; grid-template-columns: 55px 1fr; border-bottom: 1px solid var(--line); }
```

Targets `.values-list article`. Sets space inside the border: `30px 0`. Shorthand order: one value = all sides; two = vertical/horizontal; three = top/horizontal/bottom; four = top/right/bottom/left. Chooses the layout mode: `grid`. Arranges direct children in a grid. Defines grid columns; fr shares available space proportionally: `55px 1fr`. Sets the bottom border: `1px solid var(--line)`. var(...) reads a shared custom property defined near the start of the file.

### Line 301

```css
.values-list strong { color: var(--green-dark); }
```

Targets `.values-list strong`. Sets foreground/text colour: `var(--green-dark)`. var(...) reads a shared custom property defined near the start of the file.

### Line 302

```css
.values-list h3 { margin-bottom: 8px; }
```

Targets `.values-list h3`. Sets outside space below: `8px`.

### Line 303

```css
.values-list p { margin: 0; color: var(--ink-muted); }
```

Targets `.values-list p`. Sets space outside the element: `0`. Shorthand order: one value = all sides; two = vertical/horizontal; three = top/horizontal/bottom; four = top/right/bottom/left. Sets foreground/text colour: `var(--ink-muted)`. var(...) reads a shared custom property defined near the start of the file.

### Line 304

```css
.process-section { padding: 10px 0 120px; }
```

Targets `.process-section`. Sets space inside the border: `10px 0 120px`. Shorthand order: one value = all sides; two = vertical/horizontal; three = top/horizontal/bottom; four = top/right/bottom/left.

### Line 305

```css
.tech-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
```

Targets `.tech-grid`. Chooses the layout mode: `grid`. Arranges direct children in a grid. Defines grid columns; fr shares available space proportionally: `repeat(3, 1fr)`. Sets space between flex/grid items: `20px`.

### Line 306

```css
.tech-grid article { padding: 34px; background: var(--white); border-radius: 14px; border-bottom: 4px solid var(--green); }
```

Targets `.tech-grid article`. Sets space inside the border: `34px`. Shorthand order: one value = all sides; two = vertical/horizontal; three = top/horizontal/bottom; four = top/right/bottom/left. Sets the background colour or gradient: `var(--white)`. var(...) reads a shared custom property defined near the start of the file. Rounds corners; percentages and slash-separated radii can create circles or organic shapes: `14px`. Sets the bottom border: `4px solid var(--green)`. var(...) reads a shared custom property defined near the start of the file.

### Line 307

```css
.tech-grid span { display: inline-grid; min-width: 50px; height: 50px; padding: 0 8px; place-items: center; color: var(--green-dark); background: var(--green-pale); border-radius: 8px; font-weight: 800; }
```

Targets `.tech-grid span`. Chooses the layout mode: `inline-grid`. Uses a grid internally while participating as an inline-level box. Sets a minimum width: `50px`. Sets element height: `50px`. Sets space inside the border: `0 8px`. Shorthand order: one value = all sides; two = vertical/horizontal; three = top/horizontal/bottom; four = top/right/bottom/left. Sets both align-items and justify-items; center centres items in their grid areas: `center`. Sets foreground/text colour: `var(--green-dark)`. var(...) reads a shared custom property defined near the start of the file. Sets the background colour or gradient: `var(--green-pale)`. var(...) reads a shared custom property defined near the start of the file. Rounds corners; percentages and slash-separated radii can create circles or organic shapes: `8px`. Sets text weight; larger numbers are usually bolder: `800`.

### Line 308

```css
.tech-grid h3 { margin: 25px 0 10px; }
```

Targets `.tech-grid h3`. Sets space outside the element: `25px 0 10px`. Shorthand order: one value = all sides; two = vertical/horizontal; three = top/horizontal/bottom; four = top/right/bottom/left.

### Line 309

```css
.tech-grid p { margin: 0; color: var(--ink-muted); }
```

Targets `.tech-grid p`. Sets space outside the element: `0`. Shorthand order: one value = all sides; two = vertical/horizontal; three = top/horizontal/bottom; four = top/right/bottom/left. Sets foreground/text colour: `var(--ink-muted)`. var(...) reads a shared custom property defined near the start of the file.

### Line 310

```css

```

Blank line for readability; no visible effect.

### Line 311

```css
.site-footer {
```

Targets `.site-footer`.

### Line 312

```css
  min-height: 100px;
```

For `.site-footer`: Sets a minimum height: `100px`.

### Line 313

```css
  padding: 25px max(20px, calc((100% - 1180px) / 2));
```

For `.site-footer`: Sets space inside the border: `25px max(20px, calc((100% - 1180px) / 2))`. Shorthand order: one value = all sides; two = vertical/horizontal; three = top/horizontal/bottom; four = top/right/bottom/left. max(...) chooses the larger computed value. calc(...) evaluates the size arithmetic.

### Line 314

```css
  display: flex;
```

For `.site-footer`: Chooses the layout mode: `flex`. Arranges direct children with Flexbox.

### Line 315

```css
  align-items: center;
```

For `.site-footer`: Aligns children on the flex cross-axis or within grid areas: `center`.

### Line 316

```css
  justify-content: space-between;
```

For `.site-footer`: Distributes children along the flex main axis or distributes grid tracks: `space-between`.

### Line 317

```css
  gap: 25px;
```

For `.site-footer`: Sets space between flex/grid items: `25px`.

### Line 318

```css
  color: #bbc8d1;
```

For `.site-footer`: Sets foreground/text colour: `#bbc8d1`.

### Line 319

```css
  background: var(--navy);
```

For `.site-footer`: Sets the background colour or gradient: `var(--navy)`. var(...) reads a shared custom property defined near the start of the file.

### Line 320

```css
  font-size: 0.85rem;
```

For `.site-footer`: Sets text size: `0.85rem`.

### Line 321

```css
}
```

Ends the declarations for `.site-footer`.

### Line 322

```css
.site-footer p { margin: 0; }
```

Targets `.site-footer p`. Sets space outside the element: `0`. Shorthand order: one value = all sides; two = vertical/horizontal; three = top/horizontal/bottom; four = top/right/bottom/left.

### Line 323

```css

```

Blank line for readability; no visible effect.

### Line 324

```css
.reveal { opacity: 0; transform: translateY(20px); transition: opacity 650ms ease, transform 650ms ease; }
```

Targets `.reveal`. Sets transparency: 0 is invisible and 1 is fully visible; layout space remains: `0`. Transforms the element: moves vertically (negative is upward) by `20px`. Animates changes to the listed properties over the stated duration and easing: `opacity 650ms ease, transform 650ms ease`.

### Line 325

```css
.reveal.is-visible { opacity: 1; transform: translateY(0); }
```

Targets `.reveal.is-visible`. Overrides the hidden reveal state after the observer sees the element. Sets transparency: 0 is invisible and 1 is fully visible; layout space remains: `1`. Transforms the element: moves vertically (negative is upward) by `0`.

### Line 326

```css

```

Blank line for readability; no visible effect.

### Line 327

```css
@keyframes spin { to { transform: rotate(360deg); } }
```

Defines spin: its final frame rotates the element 360 degrees. The orbit-two animation repeats this rotation every 28 seconds.

### Line 328

```css

```

Blank line for readability; no visible effect.

### Line 329

```css
@media (prefers-reduced-motion: reduce) {
```

Starts a conditional group: apply these rules when the user requests reduced motion.

### Line 330

```css
  *, *::before, *::after { scroll-behavior: auto !important; animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
```

Targets `*, *::before, *::after` within `@media (prefers-reduced-motion: reduce)`. Controls scrolling to anchors: smooth animates; auto uses normal immediate scrolling: `auto !important`. !important gives this declaration priority over normal declarations. Sets animation duration: `0.01ms !important`. !important gives this declaration priority over normal declarations. Sets transition duration: `0.01ms !important`. !important gives this declaration priority over normal declarations.

### Line 331

```css
  .reveal { opacity: 1; transform: none; }
```

Targets `.reveal` within `@media (prefers-reduced-motion: reduce)`. Sets transparency: 0 is invisible and 1 is fully visible; layout space remains: `1`. Removes transforms with `none`.

### Line 332

```css
}
```

Ends the conditional group `@media (prefers-reduced-motion: reduce)`.

### Line 333

```css

```

Blank line for readability; no visible effect.

### Line 334

```css
@media (max-width: 820px) {
```

Starts a conditional group: apply these rules when viewport width is at most 820px. Later matching rules can override earlier ones.

### Line 335

```css
  h1 { font-size: clamp(3rem, 13vw, 5rem); }
```

Targets `h1` within `@media (max-width: 820px)`. Sets text size: `clamp(3rem, 13vw, 5rem)`. clamp(minimum, preferred, maximum) lets the preferred size vary within limits.

### Line 336

```css
  .menu-toggle { width: 46px; height: 42px; padding: 9px; display: flex; flex-direction: column; justify-content: center; gap: 5px; background: transparent; border: 1px solid var(--line); border-radius: 7px; }
```

Targets `.menu-toggle` within `@media (max-width: 820px)`. Sets element width: `46px`. Sets element height: `42px`. Sets space inside the border: `9px`. Shorthand order: one value = all sides; two = vertical/horizontal; three = top/horizontal/bottom; four = top/right/bottom/left. Chooses the layout mode: `flex`. Arranges direct children with Flexbox. Chooses the flex main-axis direction; column stacks children vertically: `column`. Distributes children along the flex main axis or distributes grid tracks: `center`. Sets space between flex/grid items: `5px`. Sets the background colour or gradient: `transparent`. Sets border thickness, style, and colour; 0 removes it: `1px solid var(--line)`. var(...) reads a shared custom property defined near the start of the file. Rounds corners; percentages and slash-separated radii can create circles or organic shapes: `7px`.

### Line 337

```css
  .menu-toggle span:not(.sr-only) { width: 100%; height: 2px; background: var(--navy); transition: transform 180ms ease, opacity 180ms ease; }
```

Targets `.menu-toggle span:not(.sr-only)` within `@media (max-width: 820px)`. Sets element width: `100%`. Sets element height: `2px`. Sets the background colour or gradient: `var(--navy)`. var(...) reads a shared custom property defined near the start of the file. Animates changes to the listed properties over the stated duration and easing: `transform 180ms ease, opacity 180ms ease`.

### Line 338

```css
  .menu-toggle[aria-expanded="true"] span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
```

Targets `.menu-toggle[aria-expanded="true"] span:nth-child(1)` within `@media (max-width: 820px)`. Styles a hamburger bar when the menu is open, helping form the close icon. Transforms the element: moves vertically (negative is upward) by `7px`; rotates by `45deg`.

### Line 339

```css
  .menu-toggle[aria-expanded="true"] span:nth-child(2) { opacity: 0; }
```

Targets `.menu-toggle[aria-expanded="true"] span:nth-child(2)` within `@media (max-width: 820px)`. Styles a hamburger bar when the menu is open, helping form the close icon. Sets transparency: 0 is invisible and 1 is fully visible; layout space remains: `0`.

### Line 340

```css
  .menu-toggle[aria-expanded="true"] span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }
```

Targets `.menu-toggle[aria-expanded="true"] span:nth-child(3)` within `@media (max-width: 820px)`. Styles a hamburger bar when the menu is open, helping form the close icon. Transforms the element: moves vertically (negative is upward) by `-7px`; rotates by `-45deg`.

### Line 341

```css
  .nav-links { position: absolute; top: 78px; left: 0; width: 100%; padding: 14px 20px 22px; display: none; flex-direction: column; align-items: stretch; background: var(--cream); border-bottom: 1px solid var(--line); }
```

Targets `.nav-links` within `@media (max-width: 820px)`. Sets positioning behaviour: `absolute`. Removes the element from normal flow and positions it relative to its containing block. Sets the top positioning offset: `78px`. Sets the left positioning offset: `0`. Sets element width: `100%`. Sets space inside the border: `14px 20px 22px`. Shorthand order: one value = all sides; two = vertical/horizontal; three = top/horizontal/bottom; four = top/right/bottom/left. Chooses the layout mode: `none`. Hides the element and removes its layout space. Chooses the flex main-axis direction; column stacks children vertically: `column`. Aligns children on the flex cross-axis or within grid areas: `stretch`. Sets the background colour or gradient: `var(--cream)`. var(...) reads a shared custom property defined near the start of the file. Sets the bottom border: `1px solid var(--line)`. var(...) reads a shared custom property defined near the start of the file.

### Line 342

```css
  .nav-links.is-open { display: flex; }
```

Targets `.nav-links.is-open` within `@media (max-width: 820px)`. JavaScript adds this class when opening the mobile menu. Chooses the layout mode: `flex`. Arranges direct children with Flexbox.

### Line 343

```css
  .nav-links a { text-align: center; }
```

Targets `.nav-links a` within `@media (max-width: 820px)`. Aligns inline text within its container: `center`.

### Line 344

```css
  .hero, .page-banner, .about-hero, .about-grid, .split-section { grid-template-columns: 1fr; }
```

Targets `.hero, .page-banner, .about-hero, .about-grid, .split-section` within `@media (max-width: 820px)`. Defines grid columns; fr shares available space proportionally: `1fr`.

### Line 345

```css
  .hero { padding-top: 65px; gap: 30px; }
```

Targets `.hero` within `@media (max-width: 820px)`. Sets inside space above: `65px`. Sets space between flex/grid items: `30px`.

### Line 346

```css
  .hero-visual { min-height: 470px; }
```

Targets `.hero-visual` within `@media (max-width: 820px)`. Sets a minimum height: `470px`.

### Line 347

```css
  .page-banner { padding-top: 65px; gap: 25px; }
```

Targets `.page-banner` within `@media (max-width: 820px)`. Sets inside space above: `65px`. Sets space between flex/grid items: `25px`.

### Line 348

```css
  .about-hero { padding-top: 65px; gap: 35px; }
```

Targets `.about-hero` within `@media (max-width: 820px)`. Sets inside space above: `65px`. Sets space between flex/grid items: `35px`.

### Line 349

```css
  .feature-grid, .tech-grid { grid-template-columns: 1fr; }
```

Targets `.feature-grid, .tech-grid` within `@media (max-width: 820px)`. Defines grid columns; fr shares available space proportionally: `1fr`.

### Line 350

```css
  .split-section, .about-grid { gap: 45px; }
```

Targets `.split-section, .about-grid` within `@media (max-width: 820px)`. Sets space between flex/grid items: `45px`.

### Line 351

```css
  .callout { align-items: flex-start; flex-direction: column; }
```

Targets `.callout` within `@media (max-width: 820px)`. Aligns children on the flex cross-axis or within grid areas: `flex-start`. Chooses the flex main-axis direction; column stacks children vertically: `column`.

### Line 352

```css
}
```

Ends the conditional group `@media (max-width: 820px)`.

### Line 353

```css

```

Blank line for readability; no visible effect.

### Line 354

```css
@media (max-width: 540px) {
```

Starts a conditional group: apply these rules when viewport width is at most 540px. Later matching rules can override earlier ones.

### Line 355

```css
  .nav-shell, .hero, .page-banner, .about-hero, .content-section, .process-section, .callout, .info-note, .chart-section { width: min(100% - 28px, 1180px); }
```

Targets `.nav-shell, .hero, .page-banner, .about-hero, .content-section, .process-section, .callout, .info-note, .chart-section` within `@media (max-width: 540px)`. Sets element width: `min(100% - 28px, 1180px)`. min(...) chooses the smaller computed value.

### Line 356

```css
  .brand > span { display: none; }
```

Targets `.brand > span` within `@media (max-width: 540px)`. Chooses the layout mode: `none`. Hides the element and removes its layout space.

### Line 357

```css
  .hero-actions { align-items: flex-start; flex-direction: column; gap: 20px; }
```

Targets `.hero-actions` within `@media (max-width: 540px)`. Aligns children on the flex cross-axis or within grid areas: `flex-start`. Chooses the flex main-axis direction; column stacks children vertically: `column`. Sets space between flex/grid items: `20px`.

### Line 358

```css
  .hero-visual { min-height: 400px; transform: scale(0.88); }
```

Targets `.hero-visual` within `@media (max-width: 540px)`. Sets a minimum height: `400px`. Transforms the element: scales visually without changing layout space by `0.88`.

### Line 359

```css
  .orbit-one { width: 390px; height: 390px; }
```

Targets `.orbit-one` within `@media (max-width: 540px)`. Sets element width: `390px`. Sets element height: `390px`.

### Line 360

```css
  .orbit-two { width: 310px; height: 310px; }
```

Targets `.orbit-two` within `@media (max-width: 540px)`. Sets element width: `310px`. Sets element height: `310px`.

### Line 361

```css
  .stat-chip-top { right: -25px; }
```

Targets `.stat-chip-top` within `@media (max-width: 540px)`. Sets the right positioning offset: `-25px`.

### Line 362

```css
  .stat-chip-bottom { left: -25px; }
```

Targets `.stat-chip-bottom` within `@media (max-width: 540px)`. Sets the left positioning offset: `-25px`.

### Line 363

```css
  .content-section { padding: 80px 0; }
```

Targets `.content-section` within `@media (max-width: 540px)`. Sets space inside the border: `80px 0`. Shorthand order: one value = all sides; two = vertical/horizontal; three = top/horizontal/bottom; four = top/right/bottom/left.

### Line 364

```css
  .callout, .calculator-card, .mission-card { padding: 34px 26px; }
```

Targets `.callout, .calculator-card, .mission-card` within `@media (max-width: 540px)`. Sets space inside the border: `34px 26px`. Shorthand order: one value = all sides; two = vertical/horizontal; three = top/horizontal/bottom; four = top/right/bottom/left.

### Line 365

```css
  .info-note { flex-direction: column; gap: 8px; }
```

Targets `.info-note` within `@media (max-width: 540px)`. Chooses the flex main-axis direction; column stacks children vertically: `column`. Sets space between flex/grid items: `8px`.

### Line 366

```css
  .chart-card figcaption { align-items: flex-start; flex-direction: column; gap: 8px; }
```

Targets `.chart-card figcaption` within `@media (max-width: 540px)`. Aligns children on the flex cross-axis or within grid areas: `flex-start`. Chooses the flex main-axis direction; column stacks children vertically: `column`. Sets space between flex/grid items: `8px`.

### Line 367

```css
  .chart-card figcaption span { text-align: left; }
```

Targets `.chart-card figcaption span` within `@media (max-width: 540px)`. Aligns inline text within its container: `left`.

### Line 368

```css
  .site-footer { align-items: flex-start; flex-direction: column; justify-content: center; }
```

Targets `.site-footer` within `@media (max-width: 540px)`. Aligns children on the flex cross-axis or within grid areas: `flex-start`. Chooses the flex main-axis direction; column stacks children vertically: `column`. Distributes children along the flex main axis or distributes grid tracks: `center`.

### Line 369

```css
}
```

Ends the conditional group `@media (max-width: 540px)`.

## script.js

[Open source file](script.js)

### Line 1

```javascript
document.addEventListener("DOMContentLoaded", () => {
```

Registers a callback for DOMContentLoaded, which fires after the HTML is parsed. The arrow function contains the site setup; registering it does not run it immediately.

### Line 2

```javascript
  const currentPage = document.body.dataset.page;
```

Reads body data-page into a constant, such as home, televisions, or about. dataset.page maps to the HTML data-page attribute.

### Line 3

```javascript
  const menuToggle = document.querySelector(".menu-toggle");
```

Selects the first mobile-menu button. If it is missing, querySelector returns null.

### Line 4

```javascript
  const menu = document.querySelector(".nav-links");
```

Selects the first navigation list for later opening and closing.

### Line 5

```javascript

```

Blank line for readability; no visible effect.

### Line 6

```javascript
  document.querySelectorAll("[data-nav-page]").forEach((link) => {
```

Finds every element with data-nav-page and runs this callback for each link, including brand and call-to-action links.

### Line 7

```javascript
    if (link.dataset.navPage === currentPage && link.closest(".nav-links")) {
```

Checks both that the destination matches the current page and that the link is inside .nav-links. === compares strictly; && requires both conditions. closest searches the element and its ancestors.

### Line 8

```javascript
      link.setAttribute("aria-current", "page");
```

Marks this menu link as the current page for assistive technology. CSS uses the same attribute to give it a dark background and white text.

### Line 9

```javascript
    }
```

Ends the current-page condition.

### Line 10

```javascript

```

Blank line for readability; no visible effect.

### Line 11

```javascript
    link.addEventListener("click", (event) => {
```

Registers a click callback on this link. event contains information about the click.

### Line 12

```javascript
      const destination = link.getAttribute("href");
```

Reads the link href into destination, such as televisions.html.

### Line 13

```javascript
      if (!destination || link.dataset.navPage === currentPage) {
```

Checks whether there is no destination or whether the link points to the current page. ! means not; || means either condition is sufficient.

### Line 14

```javascript
        return;
```

Exits this click callback early. Because preventDefault has not run, the browser keeps the link's normal behaviour, including same-page navigation.

### Line 15

```javascript
      }
```

Ends the early-return condition.

### Line 16

```javascript

```

Blank line for readability; no visible effect.

### Line 17

```javascript
      event.preventDefault();
```

Cancels the browser's immediate link navigation so there is time to show the fade-out.

### Line 18

```javascript
      document.body.classList.add("page-leaving");
```

Adds page-leaving to body. CSS changes opacity to 0 over 180 milliseconds.

### Line 19

```javascript
      window.setTimeout(() => {
```

Schedules a callback rather than blocking the browser while the fade plays.

### Line 20

```javascript
        window.location.href = destination;
```

Navigates the browser to the destination URL when the timeout callback runs.

### Line 21

```javascript
      }, 180);
```

Sets the timeout delay to 180 milliseconds and closes the setTimeout call. Actual execution may be later if the browser is busy.

### Line 22

```javascript
    });
```

Closes the click callback and its addEventListener call.

### Line 23

```javascript
  });
```

Closes the per-link callback and forEach call.

### Line 24

```javascript

```

Blank line for readability; no visible effect.

### Line 25

```javascript
  if (menuToggle && menu) {
```

Only sets up menu behaviour if both the button and the navigation list were found, avoiding null-reference errors.

### Line 26

```javascript
    menuToggle.addEventListener("click", () => {
```

Registers the callback that runs whenever the menu button is clicked.

### Line 27

```javascript
      const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
```

Reads aria-expanded and compares its string value to "true"; isOpen stores the previous state as a Boolean.

### Line 28

```javascript
      menuToggle.setAttribute("aria-expanded", String(!isOpen));
```

Reverses the old state with !isOpen, converts it to a string, and updates aria-expanded for assistive technology and CSS.

### Line 29

```javascript
      menu.classList.toggle("is-open", !isOpen);
```

Adds is-open if !isOpen is true; otherwise removes it. The mobile CSS displays the list when this class is present.

### Line 30

```javascript
      menuToggle.querySelector(".sr-only").textContent = isOpen ? "Open menu" : "Close menu";
```

Updates the visually hidden button label using a ternary expression: if the menu was open, it now says Open menu; otherwise Close menu.

### Line 31

```javascript
    });
```

Closes the menu click callback and listener registration.

### Line 32

```javascript
  }
```

Ends the menu-existence condition.

### Line 33

```javascript

```

Blank line for readability; no visible effect.

### Line 34

```javascript
  document.querySelectorAll("[data-current-year]").forEach((element) => {
```

Finds all data-current-year elements and processes each one.

### Line 35

```javascript
    element.textContent = new Date().getFullYear();
```

Gets the year from the user's device clock and writes it as plain text into the footer element.

### Line 36

```javascript
  });
```

Closes the year-update callback and forEach.

### Line 37

```javascript

```

Blank line for readability; no visible effect.

### Line 38

```javascript
  const revealObserver = new IntersectionObserver((entries) => {
```

Creates an IntersectionObserver to receive visibility changes for observed elements. It is configured below and starts watching targets later.

### Line 39

```javascript
    entries.forEach((entry) => {
```

Loops through the visibility-change entries delivered to this observer callback.

### Line 40

```javascript
      if (entry.isIntersecting) {
```

Checks whether this entry intersects the viewport. Together with threshold 0.12, this normally reveals content as roughly 12% becomes visible; isIntersecting itself does not test an exact percentage.

### Line 41

```javascript
        entry.target.classList.add("is-visible");
```

Adds is-visible to the observed element. CSS fades it in and moves it up to its normal position over 650 milliseconds.

### Line 42

```javascript
        revealObserver.unobserve(entry.target);
```

Stops observing this element after revealing it, so it does not animate again every time it enters view.

### Line 43

```javascript
      }
```

Ends the intersection condition.

### Line 44

```javascript
    });
```

Closes the entries loop.

### Line 45

```javascript
  }, { threshold: 0.12 });
```

Closes the observer callback and configures a 0.12 visibility threshold, meaning 12% of a target's area. The default root is the viewport.

### Line 46

```javascript

```

Blank line for readability; no visible effect.

### Line 47

```javascript
  document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));
```

Finds every .reveal element and registers it with the observer.

### Line 48

```javascript

```

Blank line for readability; no visible effect.

### Line 49

```javascript
  const calculator = document.querySelector("#energy-calculator");
```

Selects the calculator form by id. It returns null on the Home and About pages.

### Line 50

```javascript
  if (calculator) {
```

Only attaches calculator behaviour if that form exists, allowing this script to be shared across all pages.

### Line 51

```javascript
    calculator.addEventListener("submit", (event) => {
```

Registers a form-submit callback. A user can submit by clicking the button or pressing Enter; normal browser constraint validation happens before a valid submit event.

### Line 52

```javascript
      event.preventDefault();
```

Prevents normal form submission and page reload; the answer will be shown in the current page.

### Line 53

```javascript
      const formData = new FormData(calculator);
```

Collects the form's named control values into a FormData object. Nothing is sent to a server here.

### Line 54

```javascript
      const wattage = Number(formData.get("wattage"));
```

Reads the wattage field and converts its string value to a JavaScript number.

### Line 55

```javascript
      const hours = Number(formData.get("hours"));
```

Reads daily viewing hours and converts the value to a number.

### Line 56

```javascript
      const tariff = Number(formData.get("tariff"));
```

Reads the tariff in cents per kWh and converts the value to a number.

### Line 57

```javascript
      const annualEnergy = (wattage / 1000) * hours * 365;
```

Converts watts to kilowatts by dividing by 1000, then multiplies by daily hours and 365 to estimate annual kWh. Assumes the same power and viewing time every day.

### Line 58

```javascript
      const annualCost = annualEnergy * (tariff / 100);
```

Converts cents to dollars by dividing tariff by 100, then multiplies by annual kWh to get annual cost in Australian dollars.

### Line 59

```javascript
      const result = document.querySelector("#calculation-result");
```

Selects the result container so the cost and energy text can be updated.

### Line 60

```javascript

```

Blank line for readability; no visible effect.

### Line 61

```javascript
      result.querySelector("strong").textContent = annualCost.toLocaleString("en-AU", {
```

Finds the strong element inside the result and assigns a formatted cost string to textContent. en-AU selects Australian formatting; the next lines specify currency options.

### Line 62

```javascript
        style: "currency",
```

Requests currency formatting rather than a plain numeric string.

### Line 63

```javascript
        currency: "AUD"
```

Specifies Australian dollars as the currency.

### Line 64

```javascript
      });
```

Closes the formatting options and toLocaleString call, completing the cost assignment.

### Line 65

```javascript
      result.querySelector("small").textContent = `Based on ${annualEnergy.toFixed(1)} kWh per year`;
```

Builds text using a template literal. ${...} inserts annualEnergy rounded to one decimal place by toFixed(1); textContent updates the small element safely as text.

### Line 66

```javascript
    });
```

Closes the submit callback and listener registration.

### Line 67

```javascript
  }
```

Ends the calculator-existence condition.

### Line 68

```javascript
});
```

Closes the DOMContentLoaded callback and its event-listener registration.
