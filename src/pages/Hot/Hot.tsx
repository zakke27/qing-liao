/** @jsxImportSource  @emotion/react */
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import InfiniteScroll from 'react-infinite-scroll-component'
import { Avatar, List, message } from 'antd'
import { LikeOutlined, MessageOutlined } from '@ant-design/icons'
import { Article } from '../../types/interfaces'
import { getArticleList, getHotArticleList } from '../../api/article'
import Filling from '../../components/Filing/Filling'

const HomeContainer = styled.div`
  display: flex;
  flex-flow: row;
  /* background-color: lightgreen; */
  width: 960px;
`
const Content = styled.div`
  flex: 3;
  background-color: #ffffff;
  margin-right: 1.5rem;
  height: 100%;
`
const Title = styled.h3`
  /* background-color: #ffffff; */
  margin: 10px;
  /* height: 1.5rem; */
`
const ArticleList = styled(List)`
  margin: 10px;
  cursor: pointer;
  padding: 0 10px;
`
const Aside = styled.aside`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  flex: 1;
  background-color: #ffffff;
  height: 580px;
`

type ArticleList = Article[]

const Hot: React.FC = () => {
  const history = useHistory()
  const [articleList, setArticleList] = useState<ArticleList>([])
  const [hasMore, setHasMore] = useState<boolean>(true)
  const [pages, setPages] = useState<number>(2)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getHotArticleList() // 请求热门文章
        if (res?.data) {
          console.log(res)
          setArticleList(res.data)
        }
      } catch (error) {
        console.error(error)
      }
    }
    fetchData()
  }, [])

  return (
    <HomeContainer>
      <Content>
        <Title>热门文章</Title>
        <hr />

        <ArticleList
          dataSource={articleList}
          itemLayout="vertical"
          renderItem={(article: any) => {
            return (
              <List.Item
                key={article.articleid}
                onClick={() => {
                  history.push(`/article/${article.articleid}`)
                }}
                actions={[
                  <div key="author">作者：{article.username}</div>,
                  <div key="like">
                    <LikeOutlined /> {article.articlelikecount}
                  </div>
                  // <div key="comment">
                  //   <MessageOutlined /> {article}
                  // </div>
                ]}
              >
                <List.Item.Meta
                  // avatar={<Avatar src={article.avatar} />}
                  title={article.articletitle}
                />
              </List.Item>
            )
          }}
        />
      </Content>
      <Aside>热度排行</Aside>
    </HomeContainer>
  )
}

export default Hot
