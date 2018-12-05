import React from 'react';

export function RenderItemList(items){
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

export function RenderCharacterList(characters)
{
  console.log('CharCreating')
  console.log(JSON.stringify(characters))
  var renderedCharacters = characters.map((i) =>
    (
      <div key={i.characterId}>
        <div className='col-md-12'>
          <p>{i.characterName}</p>
        </div>
      </div>
    )
  );
  return renderedCharacters;
}

