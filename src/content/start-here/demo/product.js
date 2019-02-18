import React from 'react'
import { mount, route } from 'navi'
import api from './api'

export default mount({
  '/:id': route(async request => {
    let product = await api.fetchProduct(request.params.id)
    return {
      // 'head' can help with SEO when performing static rendering
      head: <>
        <meta name="description" content={product.emoji} />
      </>,

      // 'title' will be added to the <head> during static rendering,
      // but is also set as the document title during navigation.
      title: product.title,

      // You can pass data directly to a view.
      view: <Product product={product} />,
    }
  })
})

function Product({ product }) {
  return (
    <article className='Product'>
      <span className='Product-emoji'>{product.emoji}</span>
      <h1>{product.title}</h1>
      <span>{product.price}</span>
    </article>
  )
}