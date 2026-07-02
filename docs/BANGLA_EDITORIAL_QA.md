# Bangla and Technical Editorial QA

Automated validation cannot determine whether Bangla is natural, culturally clear, or technically correct. SystemPath therefore prevents managed publication until a human editor records both Bangla-language and system-design approvals.

## Bangla review

- Prefer natural Bangla explanation over word-for-word transliteration.
- Keep established terms such as API, cache, queue, shard, and latency consistent with the glossary.
- Check Bengali numerals and units without changing mathematical meaning.
- Read every question, option, and explanation independently; correct answers must not be obvious from grammar.
- Verify line wrapping and glyph rendering at 320px and 390px widths.

## Technical review

- Verify calculations, units, API semantics, failure behavior, and trade-offs.
- Confirm the architecture diagram matches the written flow.
- Confirm exactly five questions, valid correct indexes, and useful bilingual explanations.
- Ensure recommendations state assumptions instead of presenting context-dependent choices as universal facts.
- Preview both languages before approval.

## Publication workflow

1. Author and save a draft.
2. Use the private preview route.
3. Complete independent Bangla and technical review.
4. Record both approvals in the editor.
5. Publish and smoke-test the public URL.
6. If an issue is found, return to draft or roll back a prior version as a new audited version.

Reviewer identity is not yet attached because the current admin system has one shared operator credential. Move reviewer identities and approval signatures to PostgreSQL when multi-user accounts are introduced.
