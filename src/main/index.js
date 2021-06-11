import React from 'react'
import './index.css'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { API_URL } from '../config/constant'
import { dutil } from '../utils/day-util'
import { Carousel } from 'antd'

function MainPage() {
  const [products, setProducts] = React.useState([])
  const [banners, setBanners] = React.useState([])

  React.useEffect(function () {
    axios
      .get(`${API_URL}/products`)
      .then(({ data }) => {
        const products = data.products
        console.log('products 는 ', products)
        setProducts(products)
        // 위에서 state 에 있는 [] 빈 배열이기 때문에
        // setProducts 를 이용해 값을 넣어준다
        // 비동기 처리지만, state 에서 products 를 변경감지하여 값이 변하는 경우 해당 컴포넌트를 다시 그린다
        // 지금 이 코드에서 문제는 setProducts 함수를 호출하면, 결국 해당 컴포넌트가 다시 실행되면서
        // axios 를 또다시 호출하는 문제가 생긴다 이를 막기 위해 useEffect 를 사용하여 감싸주는
        // 것이다 (안그러면 무한 반복함)
      })
      .catch(error => {
        console.log(error)
      })

    axios
      .get(`${API_URL}/banners`)
      .then(({ data }) => {
        const banners = data.banners
        setBanners(banners)
      })
      .catch(error => {
        console.log(error)
      })
  }, [])

  return (
    <div>
      <Carousel autoplay={true} autoplaySpeed={3000}>
        {banners.map((banner, index) => {
          return (
            <Link to={banner.href}>
              <div id="banner">
                <img src={`${API_URL}/${banner.imgUrl}`} alt="" />
              </div>
            </Link>
          )
        })}
      </Carousel>
      <h1 id="product-headline">판매되는 상품들</h1>
      <div id="product_list">
        {products.map((product, index) => {
          return (
            <div className="product-card">
              {product.soldout === 1 && <div className="product-blur" />}
              <Link className="product-link" to={`/products/${product.id}`}>
                <div>
                  <img
                    className="product-img"
                    src={`${API_URL}/${product.imgUrl}`}
                    alt=""
                  />
                </div>
                <div className="product-content">
                  <span className="product-name">{product.name}</span>
                  <span className="product-price">{product.price}원</span>
                  <div className="product-footer">
                    <div className="product-seller">
                      <img
                        className="product-avatar"
                        src="images/icons/avatar.png"
                        alt=""
                      />
                      <span>{product.seller}</span>
                    </div>
                    <span className="product-date">
                      {dutil(product.createdAt).fromNow()}
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default MainPage
