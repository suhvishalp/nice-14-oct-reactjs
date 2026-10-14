# Scratch pad — React from scratch

**Common demo session** · ~150 minutes · a throw-away project we build together, by hand, before we touch ShopScope

This folder is **git-ignored on purpose**. Nothing in it is shipped. Everybody —
instructor included — types every line live. The only thing you are allowed to
copy-paste is a snippet from the
[React Bootstrap docs](https://react-bootstrap.github.io/) when the guide says so.

What we build: **Helpdesk**, a small support-ticket console. A header row, a
left navigation panel with the ticket queues, and a main panel with the
tickets of the selected queue. It is deliberately *not* a shop — ShopScope is
where we apply the concepts; this is where we learn them.

```
┌──────────────────────────────────────────────────────────────────┐
│  Helpdesk                                  Signed in as Vishal   │  ← row 1: <Header>
├───────────────┬──────────────────────────────────────────────────┤
│ Inbox     12  │  Inbox (5)                                       │
│ My tickets 4  │  ┌──────────────────────────────────────────┐    │
│ Unassigned 3  │  │ #1042 · Cannot log in after …     [high] │    │
│ Billing    5  │  │ Northwind Traders                        │    │
│ Technical  7  │  │ [open]  Assigned to Priya                │    │
│ Resolved  31  │  └──────────────────────────────────────────┘    │
│               │  ┌──────────────────────────────────────────┐    │
│  ← <SideNav>  │  │ #1043 · Invoice shows wrong VAT  [medium]│    │
│               │  │ Contoso Ltd                              │    │
│               │  │ [open]  [Unassigned]                     │    │
│               │  └──────────────────────────────────────────┘    │
│               │                        ← <MainPanel> + <TicketCard>
└───────────────┴──────────────────────────────────────────────────┘
```

By the end everyone can answer, without notes:

- What a component is, what an element is, and what the DOM is — and which one you write
- What `npm create vite` generated, file by file, and what each file is for
- What happens between saving `App.tsx` and pixels changing in the browser
- Why there is **no bundle** in development and exactly one in production
- How to pass data into a component (props) and type it
- Three ways to render something conditionally, and when to use which
- How to render a list and why React insists on `key`
- Where to put a breakpoint, what React DevTools shows, and what the five most common error messages mean

The project stays on your disk. Every later concept — events, state, effects,
forms — is tried here first, then implemented properly in ShopScope.

**How this fits the study notes.** The notes are the theory track; this session is
the first practice of modules 2, 4, 5 and 6. Each part below opens with a
*Read first* line naming the sections it exercises. The demo-by-demo map for the
whole program is in [study-notes/README.md](../study-notes/README.md#mapping-to-the-shopscope-demos).

---

## Before we start

| Need | Check |
|---|---|
| Node 20.19+ or 22.12+ | `node -v` |
| npm | `npm -v` |
| VS Code | with the *ESLint* extension is nice, not required |
| Chrome or Edge | install [React Developer Tools](https://react.dev/learn/react-developer-tools) now |
| A terminal in this folder | `cd scratchpad` |

---

## Part 1 — Create the project (20 min)

> **Read first:** [study-notes 02 — Introduction to React](../study-notes/02-react-introduction/) §14–§20 and §22 (Vite, the generated project, the boot sequence, Strict Mode, the toolchain, building, setup problems).

### 1.1 Scaffold

```bash
npm create vite@latest
```

`npm create vite` runs the `create-vite` package (`npx create-vite@latest` is
the same thing). It asks four questions. Answer:

| Prompt | Answer |
|---|---|
| Project name | `helpdesk` |
| Select a framework | **React** |
| Select a variant | **TypeScript** (not the SWC or compiler variants — plain is fine) |
| Install with npm and start now? / anything experimental | **No** — we want to see each step ourselves |

The non-interactive version is `npm create vite@latest helpdesk -- --template react-ts`.

```bash
cd helpdesk
```

### 1.2 What did we get? — a tour

Open the folder in VS Code (`code .`) and go through it **top to bottom**
before installing anything. Participants should be able to say what each file
is for.

| File | What it is | Say this |
|---|---|---|
| `package.json` | The project manifest: name, scripts, dependencies | "There are only two runtime dependencies: `react` and `react-dom`. Everything else is a dev tool." |
| `index.html` | The **only** HTML page. Vite serves it as-is | "Find `<div id="root">` and the `<script type="module" src="/src/main.tsx">`. That script tag is how the browser enters our code." |
| `src/main.tsx` | The entry point. Mounts React into `#root` | "Three lines that matter: find the div, create a root, render `<App />`." |
| `src/App.tsx` | The first component. The demo counter | "Look at it once. We delete it in Part 2." |
| `src/index.css`, `src/App.css` | Styles for the demo page | Delete later |
| `src/assets/`, `public/` | Images for the demo page | Delete later |
| `vite.config.ts` | Vite's configuration: one plugin, `react()` | "The plugin is what understands JSX and gives us hot reload." |
| `tsconfig.json` | Points to two other tsconfigs | "Two TypeScript *projects*: one for the app (browser), one for `vite.config.ts` (Node)." |
| `tsconfig.app.json` | TypeScript settings for `src/` | We turn `strict` on in 1.7 |
| `tsconfig.node.json` | TypeScript settings for `vite.config.ts` | Leave alone |
| `.oxlintrc.json` | Linter config (oxlint) with the two React rules | "`rules-of-hooks` and `only-export-components` — you will meet both" |
| `.gitignore` | `node_modules`, `dist` | Already correct |
| `README.md` | Vite's own readme | Delete later |

> **Why `.tsx` and not `.ts`?** `tsx` files may contain JSX. `ts` files may
> not. A component file is almost always `.tsx`; a file with only types or
> data is `.ts`. You will see both today.

### 1.3 Install

```bash
npm install
```

While it runs, open `package.json` again. `"react": "^19.2.8"` — the caret
means "any 19.x at or above this". `npm install` resolved those ranges and
wrote the exact result into `package-lock.json`; that file is what makes a
colleague's `npm install` produce the same `node_modules` as yours.

`ls node_modules | wc -l` — a few dozen folders for two dependencies. That
is normal.

### 1.4 Run it

```bash
npm run dev
```

Open the URL it prints (usually `http://localhost:5173`). You see the Vite +
React page with a counter.

Now the first thing to feel: open `src/App.tsx`, change the text
`Get started` to `Hello Helpdesk`, **save**. The browser updated without a
reload. Click the counter a few times, change the text again — **the count
survives**. That is Hot Module Replacement (HMR): Vite swapped only the
module you edited, and the React plugin (Fast Refresh) kept the component's
state. You will rely on this all day.

### 1.5 How the page boots

Trace it on the whiteboard, then prove each step in the browser:

1. Browser requests `/` → Vite returns `index.html` (View Source — it is
   your file, plus two injected script tags for HMR).
2. The `<script type="module" src="/src/main.tsx">` tag → the browser
   requests `/src/main.tsx`.
3. `main.tsx` imports `react-dom/client` and `./App.tsx` → more requests.
   Open **DevTools → Network**, filter **JS**, reload. Every file in `src/`
   is a separate request. **There is no bundle in development.**
4. `createRoot(document.getElementById('root')!)` — React takes ownership
   of that one div.
5. `.render(<App />)` — React calls your `App` function, gets back a
   description of the UI, and creates the real DOM nodes inside `#root`.
   Open **Elements**: everything under `<div id="root">` was made by React.

> The `!` after `getElementById(...)` is TypeScript's non-null assertion:
> "I know this is not `null`". The function returns `HTMLElement | null`
> because the element might not exist; we know `index.html` has it.

### 1.6 How React "compiles" — look at the real thing

The browser does not understand JSX or TypeScript. Something in the middle
translates. Show it instead of describing it:

In **Network**, click `App.tsx` and open the **Response** tab. What the
browser received is plain JavaScript:

```js
// what you wrote
<h1>Hello Helpdesk</h1>

// what the browser got (development)
/* @__PURE__ */ _jsxDEV("h1", { children: "Hello Helpdesk" }, void 0, false, { fileName: ..., lineNumber: 12 }, this)
```

Three things happened to your file, all done by the Vite React plugin in a
few milliseconds, per file, on request:

| Step | What | Who |
|---|---|---|
| JSX → function calls | Every tag becomes a call to `jsx(...)` (`jsxDEV` in dev, with file and line numbers for error messages) from `react/jsx-runtime`. **JSX is syntax sugar for function calls that return objects.** | Oxc transform inside `@vitejs/plugin-react` |
| Types stripped | `interface`, `: string`, `as`, generics — deleted. **Nothing type-checks your code in `npm run dev`.** The red squiggles come from VS Code; the build (Part 8) runs the real check. | same transform |
| HMR wiring | The `$RefreshReg$` lines at the bottom and the `import.meta.hot` at the top | the plugin |

And `import { Container } from 'react-bootstrap'` (later) will turn into
`from "/node_modules/.vite/deps/react-bootstrap.js"`. Dependencies are
**pre-bundled once** into `node_modules/.vite/deps/` so a library with 500
internal files becomes one request. Your own files are never bundled in dev.

> **Say it this way:** *Vite is a dev server that translates one file at a
> time, on demand. React is a library that turns the result of those function
> calls into DOM. They are separate tools with separate jobs.*

### 1.7 Turn `strict` on

The template leaves TypeScript's strict mode off. We turn it on now, while
the project is empty, because turning it on later means fixing every error at
once. In `tsconfig.app.json`, inside `compilerOptions`, above the
`/* Linting */` comment:

```json
    "strict": true,
```

Nothing in the editor changes yet. It will the first time you forget a type.

---

## Part 2 — Clean up and sketch the layout (15 min)

> **Read first:** [study-notes 04 — Components & JSX](../study-notes/04-components-and-jsx/) §5–§7 and §11 (what JSX compiles to, the rules of JSX, attributes, fragments).

### 2.1 Delete what the template decided for you

Stop the dev server (`Ctrl+C`) or keep it running — either is fine.

```bash
rm -rf src/assets src/App.css public README.md
```

`index.html` — remove the `<link rel="icon" …>` line (we deleted the icon)
and set the title:

```html
    <title>Helpdesk</title>
```

`src/index.css` — replace the whole file:

```css
body {
  margin: 0;
  font-family: system-ui, sans-serif;
}
```

### 2.2 The rough layout — three boxes

Replace `src/App.tsx` entirely. No components yet; plain tags, so the shape
is visible before anything else:

```tsx
function App() {
  return (
    <div className="layout">
      <header className="box">Header</header>
      <aside className="box">Left navigation</aside>
      <main className="box">Main content</main>
    </div>
  )
}

export default App
```

And `src/index.css`, add below the `body` rule:

```css
.layout {
  display: grid;
  grid-template-columns: 220px 1fr;
  grid-template-rows: 56px 1fr;
  grid-template-areas:
    'header header'
    'nav main';
  min-height: 100vh;
}

header { grid-area: header; }
aside  { grid-area: nav; }
main   { grid-area: main; }

.box {
  border: 2px dashed #999;
  padding: 1rem;
}
```

Save. Three dashed boxes in the right places. That is the whole app, shape-wise.

### 2.3 The rules of JSX — learned from the file you just typed

Point at the code. Every rule below is visible in it:

| Rule | Where | Why |
|---|---|---|
| A component is a **function** whose name starts with a **capital letter** and which returns JSX | `function App()` | lowercase names are treated as HTML tags: `<app />` would look for an HTML element called app |
| It returns **one** root element | the outer `<div className="layout">` | a function returns one value. If you don't want a wrapper div, use a *fragment*: `<>…</>` |
| `className`, not `class` | every tag | `class` is a reserved word in JavaScript, and JSX *is* JavaScript. Same reason: `htmlFor` instead of `for` |
| Every tag is closed | `<header>…</header>` | JSX is stricter than HTML. `<img>` must be `<img />`, `<br>` must be `<br />` |
| Parentheses around multi-line JSX | `return (` | without them `return` followed by a newline returns `undefined` |
| `export default App` | last line | `main.tsx` does `import App from './App.tsx'` — the default export has no fixed name on the importing side |

Try breaking one on purpose: change `className` to `class` and save. Vite's
error overlay or the TypeScript squiggle appears. Change it back. Add a second
root element next to the div and save: *Adjacent JSX elements must be wrapped
in an enclosing tag*. Change it back. Reading error messages is part of today.

---

## Part 3 — The first component: Header (20 min)

> **Read first:** [study-notes 04 — Components & JSX](../study-notes/04-components-and-jsx/) §1–§3, §5 and §15 (what a component is, capitalisation, files and exports, elements as descriptions, purity) · [study-notes 02](../study-notes/02-react-introduction/) §18 (Strict Mode).

### 3.1 Create it

```bash
mkdir src/components
```

`src/components/Header.tsx`:

```tsx
export function Header() {
  return (
    <header className="box">
      <h1>Helpdesk</h1>
    </header>
  )
}
```

That is a complete React component. A **function** that **returns JSX**.
Nothing to register, no class, no decorator. We use a *named* export
(`export function`) for components from here on — the import then has to use
the same name, which keeps the project searchable.

### 3.2 Use it

`src/App.tsx`:

```tsx
import { Header } from './components/Header'

function App() {
  return (
    <div className="layout">
      <Header />
      <aside className="box">Left navigation</aside>
      <main className="box">Main content</main>
    </div>
  )
}

export default App
```

Save. Same screen, now with a real headline in the header box.

> The import path has no extension. `./components/Header` resolves to
> `Header.tsx` — Vite and TypeScript (`moduleResolution: bundler`) both allow
> it. The template's `main.tsx` writes `./App.tsx` with the extension; both
> work, pick one and stay consistent.

### 3.3 Component, element, DOM — three different things

This is the single most useful mental model of the day. Add a temporary line
in `App.tsx`, inside the function, before `return`:

```tsx
  console.log(Header, <Header />)
```

Open the console. The first value is **a function** — your component. The
second is **a plain object** with `type: Header` and `props: {}` — an
**element**. It is a *description*: "put a Header here". React creates DOM
nodes from it in the commit step. Nobody calls `Header()` except React.

| Word | Is | You write it? |
|---|---|---|
| Component | a function: `Header` | yes |
| Element | an object: the result of `<Header />` i.e. `jsx(Header, {})` | you write the JSX, the transform makes the call |
| DOM node | `<header>` in the browser | never — React does |

Remove the `console.log` line.

Notice the log printed **twice**. `main.tsx` wraps the app in
`<StrictMode>`, which in development calls every component function twice to
flush out code that is not *pure* (a component must return the same output
for the same input and change nothing outside itself). It is a feature; it
does not happen in production. Leave `StrictMode` on.

### 3.4 First look at React DevTools

Open DevTools → **Components** tab (⚛). The tree shows `App → Header`. This
is the tree of *components*, not of DOM nodes — the Elements tab shows the
DOM. Click `Header`: no props yet, source file on the right. Keep this tab
open all day.

---

## Part 4 — Basic styles (10 min)

> **Read first:** [study-notes 04 — Components & JSX](../study-notes/04-components-and-jsx/) §8 (inline styles, conditional class names) · later, [study-notes 25 — Styling & Theming](../study-notes/25-styling-and-theming/).

Three ways to style a component. All three are plain CSS under the hood.

### 4.1 A CSS file per component

`src/components/Header.css`:

```css
.site-header {
  display: flex;
  align-items: center;
  padding: 0 1rem;
  background: #212529;
  color: #fff;
}

.site-header h1 {
  font-size: 1.25rem;
  margin: 0;
}
```

`src/components/Header.tsx`:

```tsx
import './Header.css'

export function Header() {
  return (
    <header className="site-header">
      <h1>Helpdesk</h1>
    </header>
  )
}
```

A CSS `import` has no name on the left: it is a *side-effect* import, "load
this stylesheet". In development Vite injects it as a `<style>` tag (look in
Elements → `<head>`); in the production build every imported CSS file is
extracted into one `.css` file. **The class names are global**: `.site-header`
applies anywhere in the app, same as a `<link>`-ed stylesheet. Component files
make CSS *organised*, not *scoped*.

### 4.2 Inline styles are objects

Change the `h1` temporarily:

```tsx
      <h1 style={{ letterSpacing: '0.05em' }}>Helpdesk</h1>
```

Two pairs of braces: the outer `{}` means "JavaScript expression", the inner
`{}` is an object literal. Property names are camelCase (`letterSpacing`),
values are strings or numbers. Inline styles are handy for values computed at
runtime; for everything else prefer classes. Remove the `style` attribute.

### 4.3 Where the dashed borders went

The header box lost its dashed border because `className="box"` became
`className="site-header"`. Classes are just strings; nothing magic. Keep the
other two boxes dashed for now — we replace all of this in Part 5.

---

## Part 5 — Bootstrap and the grid (25 min)

> **Read first:** [study-notes 04 — Components & JSX](../study-notes/04-components-and-jsx/) §12 and §14 (the UI tree, extracting components) · [study-notes 05 — Props & Composition](../study-notes/05-props-and-composition/) §13.1 (wrapper and layout components).

Hand-written CSS does not scale across a team and a deadline. The track uses
Bootstrap: the CSS does the styling, React Bootstrap gives us components that
emit the right markup and classes.

### 5.1 Install

Stop the dev server, then:

```bash
npm install bootstrap react-bootstrap
npm run dev
```

Look at `package.json`: two new entries under `dependencies` — runtime code
that ships to the browser, as opposed to `devDependencies`. `bootstrap` is the
CSS (and JS we will not use); `react-bootstrap` is the React components that
produce Bootstrap markup.

### 5.2 Load the CSS once

`src/main.tsx` — add the Bootstrap import **before** `./index.css` so our
own rules win when they collide:

```tsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
```

Save: the typography changes immediately. `bootstrap/dist/css/bootstrap.min.css`
is a path **into `node_modules`** — Vite resolves bare package names there.

Delete `src/components/Header.css` and its import line. Replace `src/index.css`:

```css
/* Bootstrap is imported in main.tsx and does the heavy lifting.
   Only put something here if Bootstrap really cannot express it. */
body {
  background-color: #f5f6f8;
}
```

### 5.3 The grid: a container with two rows

Bootstrap's grid is 12 columns wide. A `Row` is a flex container; a `Col`
takes a number of those 12 columns, optionally per breakpoint (`md={3}` means
"3 of 12 from the medium breakpoint up, full width below"). `Container fluid`
spans the whole viewport.

Replace `src/App.tsx`:

```tsx
import { Col, Container, Row } from 'react-bootstrap'
import { Header } from './components/Header'

function App() {
  return (
    <Container fluid className="p-0">
      <Row className="g-0">
        <Col>
          <Header />
        </Col>
      </Row>
      <Row className="g-0">
        <Col md={3} className="bg-white border-end min-vh-100">
          Left navigation
        </Col>
        <Col md={9}>Main content</Col>
      </Row>
    </Container>
  )
}

export default App
```

Save and look in **Elements**: `<Container>` became `<div class="container-fluid p-0">`,
`<Col md={3}>` became `<div class="col-md-3 bg-white …">`. React Bootstrap
components are thin: props in, Bootstrap classes out. The utility classes
(`p-0` no padding, `g-0` no gutters, `border-end`, `min-vh-100`) are plain
Bootstrap — [the cheat sheet](https://getbootstrap.com/docs/5.3/utilities/spacing/)
is open on the second screen for the rest of the course.

Shrink the browser window below 768px: the two columns stack. That is the
`md` doing its job.

### 5.4 Header with a real Navbar — copy this one from the docs

Open [react-bootstrap.github.io/docs/components/navbar](https://react-bootstrap.github.io/docs/components/navbar/).
Take the smallest example, then trim it to this. Copying from docs is
*allowed* here — knowing how to read a component library's docs is the skill.

`src/components/Header.tsx`:

```tsx
import { Container, Navbar } from 'react-bootstrap'

export function Header() {
  return (
    <Navbar bg="dark" data-bs-theme="dark">
      <Container fluid>
        <Navbar.Brand href="#">Helpdesk</Navbar.Brand>
      </Container>
    </Navbar>
  )
}
```

`Navbar.Brand` is a component attached as a property of `Navbar` — the dot
is plain JavaScript property access; JSX allows it in a tag name.

Hover `bg=` in VS Code: the prop is typed. Type `bg="purple"` and the editor
complains — React Bootstrap ships TypeScript types, so you get autocomplete
for every prop. This is the day-to-day benefit of TypeScript in React.

### 5.5 Two more components, empty for now

`src/components/SideNav.tsx`:

```tsx
export function SideNav() {
  return <nav className="p-3">Left navigation</nav>
}
```

`src/components/MainPanel.tsx`:

```tsx
export function MainPanel() {
  return <div className="p-4">Main content</div>
}
```

Wire them into `src/App.tsx` (only the second `Row` changes):

```tsx
import { Col, Container, Row } from 'react-bootstrap'
import { Header } from './components/Header'
import { SideNav } from './components/SideNav'
import { MainPanel } from './components/MainPanel'

function App() {
  return (
    <Container fluid className="p-0">
      <Row className="g-0">
        <Col>
          <Header />
        </Col>
      </Row>
      <Row className="g-0">
        <Col md={3} className="bg-white border-end min-vh-100">
          <SideNav />
        </Col>
        <Col md={9}>
          <MainPanel />
        </Col>
      </Row>
    </Container>
  )
}

export default App
```

DevTools → Components now shows `App → Container → Row → Col → Header …`.
The library's components are in the tree too; they are functions like yours.

> **The layout is done.** `App` owns the grid; each panel owns its content.
> Nothing in `SideNav` knows it sits in a 3-column `Col`, and that is the
> point: a component describes *itself*, its parent decides *where* it goes.

---

## Part 6 — Props and conditional rendering: the main panel (30 min)

> **Read first:** [study-notes 05 — Props & Composition](../study-notes/05-props-and-composition/) §1–§5 and §16 · [study-notes 06 — Conditional Rendering & Lists](../study-notes/06-conditional-rendering-and-lists/) §1–§6 and §17 · [study-notes 17 — TypeScript with React](../study-notes/17-typescript-with-react/) for typing props.

### 6.1 Data first: the `Ticket` type

Components are only interesting with data. Put the data in its own `.ts`
file (no JSX, so not `.tsx`).

```bash
mkdir src/data
```

`src/data/tickets.ts`:

```ts
export type Priority = 'low' | 'medium' | 'high'
export type Status = 'open' | 'in-progress' | 'resolved'

export interface Ticket {
  id: number
  title: string
  customer: string
  priority: Priority
  status: Status
  assignee?: string
}

export const tickets: Ticket[] = [
  {
    id: 1042,
    title: 'Cannot log in after password reset',
    customer: 'Northwind Traders',
    priority: 'high',
    status: 'open',
    assignee: 'Priya',
  },
  {
    id: 1043,
    title: 'Invoice shows wrong VAT rate',
    customer: 'Contoso Ltd',
    priority: 'medium',
    status: 'open',
  },
  {
    id: 1044,
    title: 'CSV export times out for large reports',
    customer: 'Fabrikam Inc',
    priority: 'high',
    status: 'in-progress',
    assignee: 'Marco',
  },
  {
    id: 1045,
    title: 'Feature request: dark mode',
    customer: 'Adventure Works',
    priority: 'low',
    status: 'open',
  },
  {
    id: 1046,
    title: 'Update billing address',
    customer: 'Tailspin Toys',
    priority: 'low',
    status: 'resolved',
    assignee: 'Aisha',
  },
]
```

Three TypeScript ideas, each used on purpose:

- `type Priority = 'low' | 'medium' | 'high'` — a **union of string literals**.
  `priority: 'urgent'` is a compile error. Try it.
- `interface Ticket` — the **shape** of one record. Try removing `title` from
  a ticket: the error points at the exact object.
- `assignee?: string` — the `?` makes it **optional**. Its type is
  `string | undefined`, and `strict` will force us to handle the `undefined`
  case in the UI. That is the conditional-rendering example.

### 6.2 A child component with props: `TicketCard`

**Props are the function's parameter.** One object, usually destructured in
the signature, typed with an interface.

`src/components/TicketCard.tsx`:

```tsx
import { Badge, Card } from 'react-bootstrap'
import type { Ticket } from '../data/tickets'

interface TicketCardProps {
  ticket: Ticket
}

export function TicketCard({ ticket }: TicketCardProps) {
  return (
    <Card className="mb-3">
      <Card.Body>
        <Card.Title className="mb-1">
          #{ticket.id} · {ticket.title}
        </Card.Title>
        <Card.Subtitle className="text-muted mb-2">{ticket.customer}</Card.Subtitle>
        <Badge bg="light" text="dark">
          {ticket.status}
        </Badge>
      </Card.Body>
    </Card>
  )
}
```

Things to say while typing:

- `import type { Ticket }` — the `type` keyword says "this import is only a
  type, erase it". With `verbatimModuleSyntax` in the tsconfig it is required
  for type-only imports; the editor's quick-fix adds it for you.
- `{ticket.title}` — braces switch from JSX back to JavaScript. Any
  expression goes: a variable, a call, a ternary. Not a statement (`if`,
  `for`) — those go above the `return`.
- `#{ticket.id} · {ticket.title}` — text and expressions mix freely.

### 6.3 Render it from `MainPanel`, with props flowing down

`src/components/MainPanel.tsx`:

```tsx
import type { Ticket } from '../data/tickets'
import { TicketCard } from './TicketCard'

interface MainPanelProps {
  title: string
  tickets: Ticket[]
}

export function MainPanel({ title, tickets }: MainPanelProps) {
  return (
    <div className="p-4">
      <h2 className="mb-3">{title}</h2>
      <TicketCard ticket={tickets[0]} />
      <TicketCard ticket={tickets[1]} />
    </div>
  )
}
```

`src/App.tsx` — import the data and pass it (only these lines change):

```tsx
import { tickets } from './data/tickets'
// …
          <MainPanel title="Inbox" tickets={tickets} />
```

Save. Two cards. Now **follow the data** in DevTools → Components: click
`MainPanel` → props `title: "Inbox"`, `tickets: Array(5)`. Click a
`TicketCard` → props `ticket: {…}`. Data flows **down**, parent to child, as
function arguments. A child cannot change its props; it only reads them.

Try the type system: in `App.tsx` pass `title={42}`. Red squiggle: *Type
'number' is not assignable to type 'string'*. Remove the `title` prop
entirely: *Property 'title' is missing*. This is why we type props: the
mistakes are found where you make them, not in the browser at runtime.

### 6.4 Conditional rendering — three patterns

Every ticket has a status, some have an assignee, some are high priority and
owned by nobody. Replace `src/components/TicketCard.tsx` with the final
version, then walk through the three patterns it uses:

```tsx
import { Badge, Card } from 'react-bootstrap'
import type { Priority, Ticket } from '../data/tickets'

interface TicketCardProps {
  ticket: Ticket
}

const priorityColor: Record<Priority, string> = {
  low: 'secondary',
  medium: 'primary',
  high: 'danger',
}

export function TicketCard({ ticket }: TicketCardProps) {
  const isResolved = ticket.status === 'resolved'
  const needsAttention = ticket.priority === 'high' && !ticket.assignee

  return (
    <Card className={`mb-3 ${isResolved ? 'opacity-50' : ''}`}>
      <Card.Body>
        <div className="d-flex justify-content-between align-items-start">
          <Card.Title className="mb-1">
            #{ticket.id} · {ticket.title}
          </Card.Title>
          <Badge bg={priorityColor[ticket.priority]}>{ticket.priority}</Badge>
        </div>

        <Card.Subtitle className="text-muted mb-2">{ticket.customer}</Card.Subtitle>

        <div className="d-flex gap-2 align-items-center">
          <Badge bg="light" text="dark">
            {ticket.status}
          </Badge>

          {ticket.assignee ? (
            <span>Assigned to {ticket.assignee}</span>
          ) : (
            <Badge bg="warning" text="dark">
              Unassigned
            </Badge>
          )}
        </div>

        {needsAttention && (
          <Card.Text className="text-danger mt-2 mb-0">
            High priority and nobody owns it yet.
          </Card.Text>
        )}
      </Card.Body>
    </Card>
  )
}
```

| Pattern | In the file | Use when |
|---|---|---|
| **Ternary** `cond ? <A/> : <B/>` | assignee name *or* the Unassigned badge | there are two alternatives |
| **`&&`** `cond && <A/>` | the red "nobody owns it" line | something is shown or nothing. **Careful:** `0 && <A/>` renders `0`. Make the left side a real boolean (`needsAttention`) |
| **Lookup object** | `priorityColor[ticket.priority]` | a value maps to another value; beats a chain of ternaries. `Record<Priority, string>` forces every priority to have an entry — add `'urgent'` to the union and the object is now an error |
| **Computed class** | `` `mb-3 ${isResolved ? 'opacity-50' : ''}` `` | a template literal is an expression too |

Notice the two `const` lines above `return`. Compute first, render second.
JSX stays readable when the logic has a name.

### 6.5 Early return — the fourth pattern

What if the queue is empty? `src/components/MainPanel.tsx`:

```tsx
import type { Ticket } from '../data/tickets'
import { TicketCard } from './TicketCard'

interface MainPanelProps {
  title: string
  tickets: Ticket[]
}

export function MainPanel({ title, tickets }: MainPanelProps) {
  if (tickets.length === 0) {
    return (
      <div className="p-4">
        <h2>{title}</h2>
        <p className="text-muted">No tickets in this queue. Nice work.</p>
      </div>
    )
  }

  return (
    <div className="p-4">
      <h2 className="mb-3">
        {title} <small className="text-muted">({tickets.length})</small>
      </h2>
      <TicketCard ticket={tickets[0]} />
      <TicketCard ticket={tickets[1]} />
    </div>
  )
}
```

A component is a function: `if` + `return` works like anywhere else. Use it
for the "whole different screen" cases (empty, loading, error); use
ternary/`&&` for a piece *inside* a screen. Test it: in `App.tsx` pass
`tickets={[]}` and watch the empty state, then put `tickets` back.

The two hard-coded `tickets[0]`, `tickets[1]` lines are the obvious next
problem. That is Part 7.

---

## Part 7 — Rendering a list: the left panel, then the main panel (20 min)

> **Read first:** [study-notes 06 — Conditional Rendering & Lists](../study-notes/06-conditional-rendering-and-lists/) §7–§11 (`map`, what `key` is for, the bug you must see once, choosing a key).

### 7.1 The queues

Add to `src/data/tickets.ts`, after the `Ticket` interface:

```ts
export interface Queue {
  id: string
  label: string
  count: number
}

export const queues: Queue[] = [
  { id: 'inbox', label: 'Inbox', count: 12 },
  { id: 'mine', label: 'My tickets', count: 4 },
  { id: 'unassigned', label: 'Unassigned', count: 3 },
  { id: 'billing', label: 'Billing', count: 5 },
  { id: 'technical', label: 'Technical', count: 7 },
  { id: 'resolved', label: 'Resolved', count: 31 },
]
```

### 7.2 `map` is the loop

There is no `for` in JSX. An array of data becomes an array of elements with
`Array.prototype.map`, and React renders an array of elements as siblings.

`src/components/SideNav.tsx`:

```tsx
import { Badge, ListGroup } from 'react-bootstrap'
import type { Queue } from '../data/tickets'

interface SideNavProps {
  queues: Queue[]
  activeId: string
}

export function SideNav({ queues, activeId }: SideNavProps) {
  return (
    <ListGroup variant="flush">
      {queues.map((queue) => (
        <ListGroup.Item
          key={queue.id}
          action
          href={`#${queue.id}`}
          active={queue.id === activeId}
          className="d-flex justify-content-between align-items-center"
        >
          {queue.label}
          <Badge bg="secondary" pill>
            {queue.count}
          </Badge>
        </ListGroup.Item>
      ))}
    </ListGroup>
  )
}
```

`src/App.tsx` (only these lines change):

```tsx
import { queues, tickets } from './data/tickets'
// …
          <SideNav queues={queues} activeId="inbox" />
```

Save. Six rows, Inbox highlighted, counts on the right.

Things to say while typing:

- `queues.map((queue) => (…))` — an arrow function with **parentheses**, not
  braces, so the JSX is returned implicitly. With braces you need `return`.
- `active={queue.id === activeId}` — a boolean prop computed per item. The
  same conditional idea as Part 6, applied inside a loop. `action` with no
  value means `action={true}`.
- `` href={`#${queue.id}`} `` — a template literal inside braces.

### 7.3 `key` — why React insists

Delete the `key={queue.id}` line and save. The list looks identical, but the
console says:

> *Each child in a list should have a unique "key" prop.*

Put it back. The reason: when the list changes (an item added, removed,
reordered — all coming in later sessions), React compares the new array with
the previous one to decide what to update. **`key` is how it recognises the
same item across renders.** Without it, React falls back to position, and
positions lie as soon as anything moves: wrong rows get updated, input state
jumps to a different row.

Rules:

- The key must be **unique among siblings** (not globally). `queue.id` and
  `ticket.id` are ideal.
- The key goes on the **outermost element returned by `map`**, which here is
  `ListGroup.Item`, not on something inside it.
- **Do not use the array index** unless the list never changes order or
  length — then it works by accident, and you will forget the caveat.
- `key` is not a prop: the component never receives it. If you need the id
  inside, pass it separately.

### 7.4 Apply it to the tickets

`src/components/MainPanel.tsx` — replace the two hard-coded cards:

```tsx
      {tickets.map((ticket) => (
        <TicketCard key={ticket.id} ticket={ticket} />
      ))}
```

Save. All five tickets. The resolved one is faded, the two unassigned ones
carry the yellow badge, and ticket 1043 is just a medium — only a high *and*
unassigned ticket gets the red line. Change ticket 1043's priority to `'high'`
in the data and watch the line appear.

### 7.5 The final `App.tsx`

Everything together, for reference — it should be exactly what you have:

```tsx
import { Col, Container, Row } from 'react-bootstrap'
import { Header } from './components/Header'
import { SideNav } from './components/SideNav'
import { MainPanel } from './components/MainPanel'
import { queues, tickets } from './data/tickets'

function App() {
  return (
    <Container fluid className="p-0">
      <Row className="g-0">
        <Col>
          <Header userName="Vishal" />
        </Col>
      </Row>
      <Row className="g-0">
        <Col md={3} className="bg-white border-end min-vh-100">
          <SideNav queues={queues} activeId="inbox" />
        </Col>
        <Col md={9}>
          <MainPanel title="Inbox" tickets={tickets} />
        </Col>
      </Row>
    </Container>
  )
}

export default App
```

`userName` on `Header` is new — the one prop the header takes. Finish
`src/components/Header.tsx`:

```tsx
import { Container, Navbar } from 'react-bootstrap'

interface HeaderProps {
  userName: string
}

export function Header({ userName }: HeaderProps) {
  return (
    <Navbar bg="dark" data-bs-theme="dark">
      <Container fluid>
        <Navbar.Brand href="#">Helpdesk</Navbar.Brand>
        <Navbar.Text>Signed in as {userName}</Navbar.Text>
      </Container>
    </Navbar>
  )
}
```

Final tree:

```
helpdesk/
├── index.html
├── package.json
├── vite.config.ts
├── tsconfig.json · tsconfig.app.json · tsconfig.node.json
├── .oxlintrc.json
└── src/
    ├── main.tsx              ← mounts <App /> into #root, imports Bootstrap CSS
    ├── index.css             ← body background only
    ├── App.tsx               ← the grid: 2 rows; owns the data for now
    ├── data/
    │   └── tickets.ts        ← Ticket, Queue, Priority, Status + sample arrays
    └── components/
        ├── Header.tsx        ← Navbar, prop: userName
        ├── SideNav.tsx       ← ListGroup from queues.map, prop: activeId
        ├── MainPanel.tsx     ← early return for empty, tickets.map
        └── TicketCard.tsx    ← ternary, &&, lookup object, computed class
```

---

## Part 8 — From source files to a bundle: `npm run build` (15 min)

> **Read first:** [study-notes 02 — Introduction to React](../study-notes/02-react-introduction/) §20 (building for production) · later, [study-notes 20 — Shipping to Production](../study-notes/20-production/).

Development served one file per request. Production ships as few files as
possible. Stop the dev server and run:

```bash
npm run build
```

`package.json` says `"build": "tsc -b && vite build"`. Two steps:

1. **`tsc -b`** — the TypeScript compiler, in *build* mode, with `noEmit`:
   it checks every file against the tsconfigs and writes nothing. **This is
   the only place types are checked outside the editor.** Prove it: put
   `title={42}` back in `App.tsx`, run the build, watch it fail with the file
   and line, fix it, build again.
2. **`vite build`** — Rolldown (Vite's bundler) starts at `index.html`,
   follows every `import`, and produces `dist/`:

```
dist/
├── index.html                  ← your HTML, script/link tags rewritten
└── assets/
    ├── index-[hash].js         ← React + React Bootstrap + your code, one file
    └── index-[hash].css        ← Bootstrap + index.css, one file
```

Open `dist/index.html`. The `<script>` now points at `/assets/index-xxxx.js`
and a `<link rel="stylesheet">` was added — the CSS imports in `main.tsx`
became a real stylesheet. Open the JS file: minified, one line, your component
names are gone. That is what a CDN serves to a customer.

Things worth saying while it is on screen:

- **The hash in the filename** changes whenever the content changes. The
  file can be cached forever; a new build gets a new name, so there is no
  stale cache to fight.
- **Tree-shaking**: you imported five things from `react-bootstrap`; the
  bundle contains those five, not the whole library. Dead code (the
  `jsxDEV` file-and-line data, `StrictMode` double-render, every
  `if (process.env.NODE_ENV !== 'production')` warning in React) is gone.
- **Sizes**: the terminal prints them, raw and gzipped. Write them down. When
  a later demo adds a library, compare.
- `index.html` is the only HTML. Every "page" we ever add is a component
  rendered into the same div — that is what makes this a *single-page
  application*.

Serve the result:

```bash
npm run preview
```

Same app, from `dist/`, on a different port. Open **Network**: two requests
instead of twenty. Open the console and type `console.log` twice in a
component — it prints once. No StrictMode, no dev warnings.

> `dist/` is in `.gitignore`. Builds are made by a pipeline, never committed.

---

## Part 9 — Debugging (15 min)

> **Read first:** [study-notes 02 — Introduction to React](../study-notes/02-react-introduction/) §19 and §22 (the toolchain, common setup problems) · [study-notes 04 — Components & JSX](../study-notes/04-components-and-jsx/) §17 (common errors and what they mean).

Keep the dev server running; this part is interactive.

### 9.1 React DevTools — the Components tab

- **Select a component** in the tree: props on the right, with live values.
  Click `TicketCard` for ticket 1043 → `ticket.assignee` is `undefined`.
- **Edit a prop in place**: change `title` on `MainPanel` to `Billing` in the
  panel. The screen updates. (This is a DevTools trick — real changes come
  from state, later.)
- **"rendered by"** at the bottom of the panel shows the owner chain. The
  `<>` icon jumps to the source.
- Settings (⚙) → *Highlight updates when components render*. Nothing flashes
  yet because nothing changes; it will the moment we add state.

### 9.2 Breakpoints in your TypeScript, not in the compiled JS

DevTools → **Sources** → `Ctrl/Cmd+P` → type `TicketCard.tsx`. You see your
original file, with types and JSX, because Vite serves **source maps**. Click
the line number of `const isResolved = …`, reload. Execution stops inside
your component. Hover `ticket` → the object. Step over → `isResolved` gets its
value. Resume. It stops five times, once per card — a component function
**runs once per instance, per render**.

The same thing from code: write `debugger` as a line above `return`, save.
The browser stops there when DevTools is open. Remove it (the linter will
remind you if you forget).

### 9.3 `console.log` in a component body

It is fine, and the fastest tool you have — with two things to know:

- It prints **twice** in development (StrictMode, Part 3). Not a bug.
- Log the value, not a string about it: `console.log({ ticket })` prints
  `{ ticket: {…} }` with the variable name as a label, free.

### 9.4 The three places errors show up

| Where | What it catches | Example |
|---|---|---|
| **VS Code squiggle** | TypeScript and lint, as you type | `title={42}` |
| **Vite overlay** (red screen in the browser) | Syntax errors, failed imports, a file that does not transform | unclosed tag, `import { Headr }` |
| **Browser console** | Runtime: React warnings and JavaScript errors | missing `key`, `Cannot read properties of undefined` |

The build (`tsc -b`) is the fourth; it catches whatever the editor was
ignoring because the file was not open. Run `npm run build` before you push.

`npm run lint` runs oxlint with the two React rules. You have not broken
either yet; `rules-of-hooks` becomes relevant the first time we write
`useState`.

### 9.5 The five messages you will see this week

| Message | Means | Fix |
|---|---|---|
| *Adjacent JSX elements must be wrapped in an enclosing tag* | a component returned two roots | wrap in `<>…</>` |
| *Each child in a list should have a unique "key" prop* | `map` without `key`, or `key` on the wrong element | `key={item.id}` on the outermost element |
| *Objects are not valid as a React child* | you wrote `{ticket}` instead of `{ticket.title}` | render a field, not the object |
| *Cannot read properties of undefined (reading 'title')* | the data is not there yet (or not at all) | check the prop in DevTools; later, handle loading |
| *'X' is declared but its value is never read* | an unused import or variable, `noUnusedLocals` | remove it — the build will fail otherwise |

---

## Where this project goes next

This is the scratch pad for every concept we learn before implementing it in
ShopScope. Nothing below is done today; the project is ready for all of it:

| Next concept | Where it lands here |
|---|---|
| Events | clicking a queue in `SideNav` |
| State (`useState`) | the active queue, lifted into `App` |
| Derived data | filtering `tickets` by the active queue, no second array |
| Forms and controlled inputs | a "new ticket" form in `MainPanel` |
| Effects and fetching | the tickets come from an API instead of `tickets.ts` |
| Custom hooks, context | when the props start to pile up |

Keep the project. Don't commit it (this folder is ignored). If you break it
beyond repair, Part 1 takes four minutes.

---

## Instructor notes

- **Timing** adds up to ~150 min with the deliberate mistakes. Parts 8 and 9
  can be cut to 10 min each if the room is fast; do not cut 1.5–1.6 or 3.3 —
  those are the mental models the rest of the course leans on.
- **Deliberate mistakes** are in the text (`class`, two roots, no `key`,
  `title={42}`, `tickets={[]}`). Make each one, read the message aloud, fix it.
- **Second screen**: Bootstrap utilities, React Bootstrap component docs,
  DevTools.
- **If something will not install**: `rm -rf node_modules package-lock.json && npm install`.
  If port 5173 is taken: `npm run dev -- --port 5174`.
- The final code was type-checked, linted and built with the template as
  generated on 12 Oct 2026 (Vite 8.3, React 19.2, TypeScript 6.0,
  react-bootstrap 2.10, bootstrap 5.3). Versions will drift; the concepts
  will not.
