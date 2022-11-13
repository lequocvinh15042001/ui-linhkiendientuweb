import React from 'react'
import { GiCompass, GiDiamondHard, GiStabbedNote } from 'react-icons/gi'
export const links = [
  {
    id: 1,
    text: 'trang chủ',
    url: '/',
  },
  {
    id: 2,
    text: 'về chúng tôi',
    url: '/about',
  },
  {
    id: 3,
    text: 'sản phẩm',
    url: '/products',
  },
  {
    id: 4,
    text: 'Blog',
    url: '/blog',
  },
  {
    id: 5,
    text: 'Liên hệ',
    url: '/contact',
  }
]

export const services = [
  {
    id: 1,
    icon: <GiCompass />,
    title: 'mission',
    text:
      'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptates, ea. Perferendis corrupti reiciendis nesciunt rerum velit autem unde numquam nisi',
  },
  {
    id: 2,
    icon: <GiDiamondHard />,
    title: 'vision',
    text:
      'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptates, ea. Perferendis corrupti reiciendis nesciunt rerum velit autem unde numquam nisi',
  },
  {
    id: 3,
    icon: <GiStabbedNote />,
    title: 'history',
    text:
      'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptates, ea. Perferendis corrupti reiciendis nesciunt rerum velit autem unde numquam nisi',
  },
]

export const products_url = 'https://sachu-ecommerce-store-api.herokuapp.com/api/products'

export const single_product_url = `https://sachu-ecommerce-store-api.herokuapp.com/api/products/`
