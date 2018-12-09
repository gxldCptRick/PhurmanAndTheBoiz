import React from 'react';

export function RenderItemList(items){
  items = Array.from(items);
  var renderedItems = items.map((i) =>
    (
    <div key={i.itemId}>
      <div className='col-md-6'>
        <p>{i.itemName}</p>
      </div>
      <div className='col-md-6'>
        <p>{i.itemType}</p>
      </div>
    </div>
    )
  );
  return renderedItems;
}

export function RenderComboForChars(characterList){
  characterList = Array.from(characterList);
  var renderedCharacters = characterList.map((i) =>
      <option selected value={i.characterId}> {i.characterName} ({i.level})</option>
  );
  return renderedCharacters;
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

export const options={
  CreateCharacter: 'createC',
  EditCharacter: 'editC',
  CreateItem: 'createI',
  EditItem: 'editI',
};

