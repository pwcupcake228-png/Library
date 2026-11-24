# Glossary

> **Status:** not written yet. Replace this guidance with the terms of your own application.

The words of your domain and what exactly they mean in **this** app. AI agents read this file before every task (it is loaded through `opencode.jsonc`). Free models are weak at telling similar words apart — a clear glossary stops them from mixing up your concepts in code, UI and tests.

## How to write it

- One row per term: the word, what it means here, what it must **not** be confused with, and its name in code.
- Add every pair of words that sound alike but mean different things (for example *product* vs *order item*, *user role* vs *job title*).
- Use these exact words everywhere: requirements, UI texts, code, tests. If you rename a term, change it here first.

## Terms

| Term | Meaning in this app | Not to be confused with | In code |
| --- | --- | --- | --- |
| <!-- Example: Booking --> | <!-- A reserved time slot for one client --> | <!-- Visit: a booking that actually happened --> | <!-- `bookings` table, `Booking` type --> |
