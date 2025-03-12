import React from 'react'
import type { NextPage } from 'next'
import type { ErrorProps } from 'next/error'
import Error from 'next/error'
import PropTypes from 'prop-types'

const CustomErrorComponent: NextPage<ErrorProps> = ({ statusCode }) => {
  return <Error statusCode={statusCode} />
}

CustomErrorComponent.propTypes = { statusCode: PropTypes.number.isRequired }

CustomErrorComponent.getInitialProps = async (contextData) => {
  // This will contain the status code of the response
  return Error.getInitialProps(contextData)
}

export default CustomErrorComponent
