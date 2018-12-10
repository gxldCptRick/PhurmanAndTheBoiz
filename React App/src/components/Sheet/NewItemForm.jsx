
import React, {Component} from 'react';
import { Resource, PutToResource, PostToResource, GetResource, DeleteResource } from '../../helpers/ApiService';
import { changes } from '../../helpers/ProfileHelper';
export class ItemForm extends Component{
  constructor(props){
    super(props);
    this.state = {
      itemData: {
        itemId: '',
        userId: '',
        itemType: '',
        itemName: '',
        stats: {
          damageRoll: '',
          AttackBonus: 0,
        }
      }
    }

    this.renderButton = this.renderButton.bind(this);
    this.handleAddItem = this.handleAddItem.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);    
    this.handleItemType = this.handleItemType.bind(this);    
    this.handleDamageRoll = this.handleDamageRoll.bind(this);    
    this.handleAttackBonus = this.handleAttackBonus.bind(this);
  }

  componentWillMount(){
    let itemData = Object.assign({},this.state.itemData)
    itemData.userId = this.props.uID;
    this.setState({itemData: itemData})    }

  componentDidMount(){
    if(this.props.rID !== ''){
      GetResource(Resource.Items, this.props.rID)
      .then(response => response.json())
      .then(json => this.setState({itemData: json}))
    }else if(this.props.data !== ''){
      this.setState({itemData: this.props.data})
    }
  }

  handleRemoval(){
    DeleteResource(Resource.Items,this.state.itemData.itemId)
    .then( () => this.props.callback(changes.remove))
  }
  handleAddItem(){
    if(this.state.itemData.itemId === ''){
      PostToResource(Resource.Items, this.state.itemData)
      .then(()=> this.props.callback(changes.add))
    }else{
      PutToResource(Resource.Items,this.state.itemData.userId,this.state.itemData)
      .then(()=> this.props.callback(changes.edit))
    }
  }

  renderButton(){
    if(this.state.itemData.itemId  === ''){
        return <button onClick={this.handleAddItem}>Add</button>
    }else{
        return(
          <div className='row'>
            <button onClick={this.handleAddItem}>Update</button>
            <button onClick={this.handleRemoval.bind(this)}>Delete Item</button>
          </div>
        )
    }
  }

  handleNameChange(e){
    let itemData = Object.assign({},this.state.itemData)
    itemData.itemName = e.target.value;
    this.setState({itemData: itemData})  
  }

  handleItemType(e){
    let itemData = Object.assign({},this.state.itemData)
    itemData.itemType = e.target.value;
    this.setState({itemData: itemData})
  }

  handleDamageRoll(e){
    let stats = Object.assign({},this.state.itemData.stats)
    stats.damageRoll = e.target.value;
    this.setState({itemData:{...this.state.itemData, stats: stats}})
  }
  handleAttackBonus(e){
    let stats = Object.assign({},this.state.itemData.stats)
    stats.AttackBonus = e.target.value;
    this.setState({itemData:{...this.state.itemData, stats: stats}})
  }

  render(){
    return(
      <div>
        <div className='row'>
          <div className='col-md-3'>
            <label className='col-md-3'>Item Name</label>
            <input type='text' className='col-md-9' onChange={this.handleNameChange} value={this.state.itemData.itemName} />
          </div>
          <div className='col-md-3'>
            <label className='col-md-3'>Type</label>
            <input type='text' className='col-md-9' onChange={this.handleItemType} value={this.state.itemData.itemType} />
          </div>
          <div className='col-md-3'>
            <label className='col-md-3'>Damage Roll</label>
            <input type='text' className='col-md-9' onChange={this.handleDamageRoll} value={this.state.itemData.stats.damageRoll} />
          </div>
          <div className='col-md-3'>
            <label className='col-md-3'>Attack Bonus</label>
            <input type='number' className='col-md-9' onChange={this.handleAttackBonus} value={this.state.itemData.stats.AttackBonus}/>
          </div>
        </div>
        <this.renderButton/>
      </div>
    );
  }
}