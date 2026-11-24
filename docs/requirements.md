# Product Requirements

> **Status:** not written yet. Replace this guidance with the requirements of your own application.

This file describes **what** your application must do. AI agents read it before planning or implementing anything (it is loaded automatically through `opencode.jsonc`), so clear requirements lead to better code. Write it in English.

Keep **how** it is built (technical decisions) in `docs/architecture.md`.

## How to write good requirements

- **Define a small but complete MVP** (minimum viable product): the smallest version of your idea that a real user could use from start to finish. Example size: 3–6 user stories.
- **Be specific and observable.** "The user sees an error message when the title is empty" is testable; "the form is user-friendly" is not.
- **Write down what is out of scope.** It stops you (and the AI) from building extra features.
- **Update this file when you change your mind**, before asking an agent to implement the change.
- Ask an AI agent to help you write and critique this file, but make the final decisions yourself.

---

## 1. Product overview

<!--
- What is the application called?
- What problem does it solve, and for whom?
- One or two sentences that describe the main idea.
-->

## 2. Users

<!--
Who uses the application? Example: "a student who wants to track homework deadlines".
-->

## 3. User stories

<!--
Format: As a <type of user>, I want <goal> so that <reason>.

1. As a ..., I want ... so that ...
2. As a ..., I want ... so that ...
-->

## 4. Scope

### In scope (MVP)

<!-- The features you will build now. -->

### Out of scope

<!-- Features you will NOT build now (for example: user accounts, payments, mobile app). -->

## 5. Acceptance criteria

<!--
For each user story, list checks that prove it works. They become your tests.

Story 1:
- Given ..., when ..., then ...
- ...
-->

## 6. Data

<!--
What information does the application store or show? List the main entities and their fields.
Example: Task — title (required, max 100 characters), due date (optional), done (true/false).
Where the data is stored is an architecture decision: see docs/architecture.md.
-->

## 7. Open questions

<!-- Things you have not decided yet. -->
