import { ClassType, DetailedHTMLFactory } from 'react'
export type MdeComponentSimilarTo<E extends HTMLElement, A> = ClassType<
  Partial<DetailedHTMLFactory<A, E>>,
  any,
  any
>
