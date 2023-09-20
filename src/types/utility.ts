export type FilterConditionally<Source, Condition> = Pick<
  Source,
  { [K in keyof Source]: Source[K] extends Condition ? K : never }[keyof Source]
>
