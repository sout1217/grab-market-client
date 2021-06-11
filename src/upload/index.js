import {
  Button,
  Divider,
  Form,
  Input,
  InputNumber,
  Upload,
  message,
} from 'antd'
import './index.css'
import { useState } from 'react'
import { API_URL } from '../config/constant'
import axios from 'axios'
import { useHistory } from 'react-router-dom'

function UploadPage() {
  const [imageUrl, setImageUrl] = useState(null)
  const history = useHistory() // 라이프 사이클 상 use 들은 최상단에 선언해야 한다 (react hook)

  const onSubmit = values => {
    // values 는 form 의 입력했던 값들이다

    let data = {
      name: values.name,
      description: values.description,
      seller: values.seller,
      price: parseInt(values.price),
      imgUrl: imageUrl, // state 에 있는 imageUrl
    }
    axios
      .post(`${API_URL}/products`, data)
      .then(result => {
        history.replace('/') // 이전 페이지의 기록이 사라진다
      })
      .catch(error => {
        message.error(`에러가 발생했습니다 ${error.message}`)
      })
  }
  const onChangeImage = info => {
    if (info.file.status === 'uploading') {
      return
    }
    if (info.file.status === 'done') {
      const response = info.file.response
      const imageUrl = response.imgUrl
      setImageUrl(imageUrl)
    }
  }
  return (
    <div id="upload-container">
      <Form name="상품 업로드" onFinish={onSubmit}>
        <Form.Item
          name="upload"
          label={<div className="upload-label">상품 사진</div>}
        >
          <Upload
            name="image"
            action={`${API_URL}/image`}
            listType="picture"
            showUploadList={false}
            onChange={onChangeImage}
          >
            {imageUrl ? (
              <img id="upload-img" src={`${API_URL}/${imageUrl}`} alt="" />
            ) : (
              <div id="upload-img-placeholder">
                <img src="/images/icons/camera.png" alt="" />
                <span>이미지를 업로드해주세요.</span>
              </div>
            )}
          </Upload>
        </Form.Item>
        <Divider /> {/* 선 하나 나눠주기 (=hr태그와 같음) */}
        <Form.Item
          name="seller"
          label={<div className="upload-label">판매자 명</div>}
          rules={[{ required: true, message: '판매자 이름을 입력해주세요' }]}
        >
          <Input
            className="upload-name"
            size="large"
            placeholder="이름을 입력해주세요"
          />
        </Form.Item>
        <Divider />
        <Form.Item
          name="name"
          label={<div className="upload-label">상품 이름</div>}
          rules={[{ required: true, message: '상품이름을 입력해주세요' }]}
        >
          <Input
            className="upload-name"
            size="large"
            placeholder="상품이름을 입력해주세요"
          />
        </Form.Item>
        <Divider />
        <Form.Item
          name="price"
          label={<div className="upload-label">상품 가격</div>}
          rules={[{ required: true, message: '상품가격을 입력해주세요' }]}
        >
          <InputNumber className="upload-price" size="large" defaultValue={0} />
        </Form.Item>
        <Divider />
        <Form.Item
          name="description"
          label={<div className="upload-label">상품 소개</div>}
          rules={[{ required: true, message: '상품소개를 입력해주세요' }]}
        >
          <Input.TextArea
            size="large"
            id="product-description"
            showCount /* 이렇게 써도 true 와 같다 */
            maxLength={300}
            placeholder="상품소개를 적어주세요"
          />
        </Form.Item>
        <Form.Item>
          <Button id="submit-button" size="large" htmlType="submit">
            문제등록 하기
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default UploadPage
