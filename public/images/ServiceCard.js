import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { changeActiveStatus } from '../../actions/serviceActions'

const ServiceCard = (props) => {

  const id = props.service.id

  const customStyles = {
    margin: '5px 5px',
    padding: '5px',
    height: '150px',
    idth: '100px',
    border: 'solid 1px black'
  }
  const imgStyle = {
    height: '20px',
    width: '20px'
  }

  return (
    <div style={customStyles}>
      <h6>{props.service.name}</h6>
      <img style={imgStyle} src={`/images/${id}.png`} alt='Alternate'/>
      <button onClick={() => props.changeActiveStatus(props.service.category_id, props.service.id)}> 
        {props.service.active ? 'Turn OFF' : 'Turn ON'} </button>
      <div>
        {props.service.description.slice(0, 150)} ...
      </div>
      <Link to={`/service/${props.service.category_id}/${props.service.id}`}>
        Configure
      </Link>
    </div>
  )
}
const mapStateToProps = (state, ownProps) => {
  const foundCategoryIndex = state.categories.findIndex(category => category.id === ownProps.categoryId)
  const foundServiceIndex = state.categories[foundCategoryIndex].services.findIndex(service => service.id === ownProps.serviceId)

  return {
    service: state.categories[foundCategoryIndex].services[foundServiceIndex]
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    changeActiveStatus: (categoryId, serviceId) => dispatch(changeActiveStatus(categoryId, serviceId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ServiceCard)