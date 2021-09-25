import React from 'react'

type Props = {
  IF: boolean,
  ELSE?: React.ReactNode,
  children: React.ReactChild | React.ReactChild[]
}

const IFComponent = ({ IF, ELSE, children }: Props) => {
  return <>{IF ? children : (ELSE || null)}</>
}

export default IFComponent