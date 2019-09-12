import React, { Component } from 'react'
import './Header.css'

import fotoPerfil from '../assets/perfil.png'

class Header extends Component {
  render() {
    return (
      <div className="retangulo">
        <div className="face"></div>
        <div className="perfil">
          <span className="perfil-text">Meu perfil</span>
          <img src={fotoPerfil} alt="Foto de perfil" className="perfil-icon" />
        </div>
      </div>
    )
  }
}

export default Header
