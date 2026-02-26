# Prompts Log

## Prompt 1
**Prompt:** Guardrail: minimal changes; no refactor; use existing structure/deps; list created files first. Also append this prompt and its use case to /docs/prompts.md.
Create model class Product with fields id(Long, @Id @GeneratedValue), name(@NotBlank), price(BigDecimal, @NotNull @DecimalMin("0.0")), description(@Size(max=1000)), stock(Integer, @NotNull @Min(0)). Add Lombok @Data, @NoArgsConstructor, @AllArgsConstructor, and validation annotations. Use @Entity @Table(name="products"). Add @Slf4j but do not add any try/catch or methods.

**Use Case:** Define core product entity with validation and logging.


## Prompt 2
**Prompt:** Guardrail: minimal changes; no refactor; list created files first. Also append this prompt and its use case to /docs/prompts.md.
Create enum Role with values ADMIN, CUSTOMER. Keep it in package model. No methods, no annotations.
**Use Case:** Define user roles for future auth/authorization.



## Prompt 3
**Prompt:** From now on, for every command or prompt I give you, automatically append the full prompt text along with a short use-case description as a new entry at the end of /docs/prompts.md. Do this WITHOUT me having to mention it again. Do not modify any existing code or files when logging. Only add the prompt entry to prompts.md in a clean one-line format.

**Use Case:** Establish automatic prompt logging workflow for all future commands.
