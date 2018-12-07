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

export function RenderCharacterList(characterList)
{
  characterList = Array.from(characterList);
  var counter = 0;
  var renderedCharacters = characterList.map((i) =>
    <div>
      <p>{i.class}</p>
    </div>
  );
  return renderedCharacters;
}


const options={
  CreateCharacter: 'createC',
  EditCharacter: 'editC',
  CreateItem: 'createI',
  EditItem: 'editI',
};
            export{
              options
            }
