import { useParams } from 'react-router-dom'
import axios from 'axios'
import React from 'react'
import './index.css'
import { API_URL } from '../config/constant'
import { dutil } from '../utils/day-util'
import { Button, message } from 'antd'

function ProductPage() {
  // const params = useParams() // params.id
  const { id } = useParams()

  const [product, setProduct] = React.useState(null)

  const getProduct = () => {
    axios
      .get(`${API_URL}/products/${id}`)
      .then(({ data }) => {
        setProduct(data.products)
      })
      .catch(error => {
        console.log(error)
      })
  }

  React.useEffect(function () {
    getProduct()
  }, [])

  /* 비동기 호출 전에 보여줄 화면 */
  if (product === null) {
    return <h1>상품 정보를 받고 있습니다...</h1>
  }

  const onClickPurchase = () => {
    axios
      .post(`${API_URL}/purchase/${id}`)
      .then(() => {
        message.info('구매가 완료되었습니다')
        getProduct() // 화면 다시 그리기
      })
      .catch(error => {
        message.error(`에러가 발생했습니다 ${error}`)
      })
  }
  return (
    <div>
      <div id="image-box">
        <img src={`${API_URL}/${product.imgUrl}`} alt="" />
      </div>
      <div id="profile-box">
        <img src="/images/icons/avatar.png" alt="" />
        <span>{product.seller}</span>
      </div>
      <div id="content-box">
        <div id="name">{product.name}</div>
        <div id="price">{product.price}원</div>
        <div id="createdAt">
          {dutil(product.createdAt).format('YYYY년 MM월 DD일')}
        </div>
        <Button
          id="purchase-button"
          size="large"
          type="primary"
          danger
          onClick={onClickPurchase}
          disabled={product.soldout === 1}
        >
          구매하기
        </Button>
        <pre id="description">{product.description}</pre>
      </div>
    </div>
  )
}

export default ProductPage
