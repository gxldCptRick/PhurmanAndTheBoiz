import React from 'react';

export function RenderItemList(items){
  items = Array.from(items);
  var renderedItems = [];
  for(var i = 0; i < renderedItems.length; i++){
    RenderItemList.push(<option selected value={i}> {items[i].itemName}: {items[i].itemType} ({items[i].AttackBonus})</option>)
  }
  return renderedItems;
}

export function RenderComboForChars(characterList){
  var cList = Array.from(characterList);
  var renderedCharacters = [];
  for(var i = 0; i < characterList.length; i++){
    renderedCharacters.push(<option selected value={i}> {cList[i].characterName} ({cList[i].level})</option>)
  }
  return renderedCharacters;
}

export function RenderComboForItems(itemlist){
  itemlist = Array.from(itemlist);
  var renderedItems = [];
  for(var i = 0; i < itemlist.length; i++){
    renderedItems.push(<option selected value={i}> {itemlist[i].itemName}: {itemlist[i].itemType} ({itemlist[i].stats.AttackBonus})</option>)
  }
  return renderedItems;
}

export function RenderCharacterList(characterList)
{
  characterList = Array.from(characterList);
  var renderedCharacters = characterList.map((i) =>
    <div>
      <p>{i.characterName} ({i.level})</p>
    </div>
  );
  return renderedCharacters;
}

export const changes={
  edit: 'edit',
  remove: 'remove',
  add: 'add',
}

export const options={
  CreateCharacter: 'createC',
  EditCharacter: 'editC',
  CreateItem: 'createI',
  EditItem: 'editI',
};

