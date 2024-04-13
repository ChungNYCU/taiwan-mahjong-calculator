"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

interface MahjongTile {
  id: number;
  name: string;
  image: string; // URL to the tile image
}

const mahjongTiles: Map<string, number> = new Map([
  ["Man1", 0], ["Man2", 0], ["Man3", 0], ["Man4", 0], ["Man5", 0], ["Man6", 0], ["Man7", 0], ["Man8", 0], ["Man9", 0],
  ["Pin1", 0], ["Pin2", 0], ["Pin3", 0], ["Pin4", 0], ["Pin5", 0], ["Pin6", 0], ["Pin7", 0], ["Pin8", 0], ["Pin9", 0],
  ["Sou1", 0], ["Sou2", 0], ["Sou3", 0], ["Sou4", 0], ["Sou5", 0], ["Sou6", 0], ["Sou7", 0], ["Sou8", 0], ["Sou9", 0],
  ["Ton", 0], ["Nan", 0], ["Shaa", 0], ["Pei", 0], ["Chun", 0], ["Hatsu", 0], ["Haku", 0]
]);
const imgRoot: string = "/tileImgs/Regular/"
const imgPath: Array<string> = [
  "Man1", "Man2", "Man3", "Man4", "Man5", "Man6", "Man7", "Man8", "Man9",
  "Pin1", "Pin2", "Pin3", "Pin4", "Pin5", "Pin6", "Pin7", "Pin8", "Pin9",
  "Sou1", "Sou2", "Sou3", "Sou4", "Sou5", "Sou6", "Sou7", "Sou8", "Sou9",
  "Ton", "Nan", "Shaa", "Pei", "Chun", "Hatsu", "Haku"
]

const MahjongSelector: React.FC = () => {
  const [selectedTile, setSelectedTile] = useState<Map<string, number>>(mahjongTiles);

  useEffect(() => {
    console.log(selectedTile)
  }, [selectedTile])

  const handleTileSelect = (tile: string) => {
    // Create a new Map from the existing one for immutability
    const newSelectedTile = new Map(selectedTile);

    // Check if the tile is already in the map
    const count = newSelectedTile.get(tile) || 0;

    // Update the count
    newSelectedTile.set(tile, count + 1);

    // Update the state with the new map
    setSelectedTile(newSelectedTile);
    console.log(tile);
  };

  const handleTileDeselect = (tile: string) => {
    // Create a new Map from the existing one for immutability
    const newSelectedTile = new Map(selectedTile);

    // Check if the tile is already in the map
    const count = newSelectedTile.get(tile) || 0;

    // Update the count
    newSelectedTile.set(tile, count - 1);

    // Update the state with the new map
    setSelectedTile(newSelectedTile);
    console.log(tile);
  };

  const handleGenerateBtnClick = () => {
    let hasValue = false
    let results = [];
    for (let i = 0; i < 9; i++) {
      const amount = selectedTile.get(imgPath[i]) || 0
      for (let j = amount; j > 0; j--) {
        results.push(i + 1)
        hasValue = true
      }
    }
    if (hasValue) { results.push('m') }
    hasValue = false
    for (let i = 9; i < 18; i++) {
      const amount = selectedTile.get(imgPath[i]) || 0
      for (let j = amount; j > 0; j--) {
        results.push(i - 9 + 1)
        hasValue = true
      }
    }
    if (hasValue) { results.push('p') }
    hasValue = false
    for (let i = 18; i < 27; i++) {
      const amount = selectedTile.get(imgPath[i]) || 0
      for (let j = amount; j > 0; j--) {
        results.push(i - 18 + 1)
        hasValue = true
      }
    }
    if (hasValue) { results.push('s') }
    hasValue = false
    for (let i = 27; i < 34; i++) {
      const amount = selectedTile.get(imgPath[i]) || 0
      for (let j = amount; j > 0; j--) {
        results.push(i - 27 + 1)
        hasValue = true
      }
    }
    if (hasValue) { results.push('z') }

    // Join the array into a single string
    const resString = results.join('');
    console.log(resString);
  }

  return (
    <div className='w-[800px]'>
      <h1>Select a Mahjong Tile</h1>
      <div className='flex flex-wrap'>
        {imgPath.map((tile, index) => (
          <div key={index} className='p-1 w-1/9 mr-4 mb-4'>
            <button onClick={() => handleTileSelect(tile)}>
              <Image
                src={`${imgRoot}${tile}.png`}
                alt={tile}
                width={60}
                height={100}
              />
            </button>
          </div>
        ))}
      </div>
      <div>
        {Array.from(selectedTile).map(([tile, value]) => (
          // Create an array with 'value' number of elements and map over it to render the Image components
          [...Array(value)].map((_, index) => (
            <button key={`${tile}-${index}`} onClick={() => handleTileDeselect(tile)}>
              <Image
                src={`${imgRoot}${tile}.png`}
                alt={tile}
                width={60}
                height={100}
              />
            </button>
          ))
        ))}
      </div>
      <button onClick={handleGenerateBtnClick}>generate</button>
    </div>
  );
};

export default MahjongSelector;
