import React, { Component } from 'react'
import './PostList.css'

import Post from './Post'

class PostList extends Component {
  state = {
    posts: [
      {
        id: 1,
        author: {
          name: 'Henrique Kalife',
          avatar: 'https://media.licdn.com/dms/image/C4E03AQG6Xx7v0vFjAw/profile-displayphoto-shrink_200_200/0?e=1578528000&v=beta&t=J6JDqLAxt-xIQasIWYuKRd6_A96RIFCG_DtINxLjBMk'
        },
        date: '09 Nov 2019',
        content: 'Pessoal, alguém sabe se a Rocketseat está contratando?',
        comments: [
          {
            id: 1,
            author: {
              name: 'Diego Fernandes',
              avatar: 'https://media.licdn.com/dms/image/C4D03AQF8tYAjGopniw/profile-displayphoto-shrink_200_200/0?e=1578528000&v=beta&t=tOCaHtk4qak2S_RvwKeSHLgZZ0XpopnN5ImdZywIFks'
            },
            content: " A Rocketseat está sempre em busca de novos membros para o time, e geralmente ficamos de olho em quem se destaca no Bootcamp, inclusive 80% do nosso time de devs é composto por alunos do Bootcamp. Além disso, se você tem vontade de ensinar gravando vídeos e criando posts, pode me chamar no Discord! (Sério, me chamem mesmo, esse comentário é real)"
          },
          {
            id: 2,
            author: {
              name: 'Rodrigo Abreu',
              avatar: 'https://media.licdn.com/dms/image/C4E03AQEdDw2T5OI_HA/profile-displayphoto-shrink_200_200/0?e=1578528000&v=beta&t=xfoE6WNBi9CACbq7Kp4BJ5_sS3JHZqYlmv4J1rAmDrg'
            },
            content: "Olha a oportunidade aí, padrinho!"
          }
        ]
      },
      {
        id: 2,
        author: {
          name: 'Douglas Marques',
          avatar: 'https://media.licdn.com/dms/image/C4D03AQHQkLsnLQf73g/profile-displayphoto-shrink_200_200/0?e=1578528000&v=beta&t=BB60HSzDKstfs6hilLI7H5HhHrEcWyGkrCoMKNheKSo'
        },
        date: '08 Nov 2019',
        content: 'Caraca, React é bom mesmo!',
        comments: [
          {
            id: 3,
            author: {
              name: 'Douglas Silva',
              avatar: 'https://media.licdn.com/dms/image/C4E03AQE_EyaJ3OkvcQ/profile-displayphoto-shrink_200_200/0?e=1578528000&v=beta&t=37aG1ahZHKWkVMi1ExF1cZLBfo5L1FePueSsBYlOWys'
            },
            content: "Eu te avisei ;)"
          }
        ]
      }
    ]
  }

  render() {
    return (
      <div className="container">
        {this.state.posts.map(post => <Post key={post.id} data={post} />)}
      </div>
    )
  }
}

export default PostList
