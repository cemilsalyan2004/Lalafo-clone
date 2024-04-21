import React, { useState, useEffect } from 'react';
import { category } from '../types/types';
import axios from 'axios';
import url from '../url';
import { Dialog } from '@material-tailwind/react';

import { LuCable, LuSofa } from 'react-icons/lu';
import {
  PiPlantLight,
  PiTShirtLight,
  PiDog,
  PiFirstAidKitLight,
} from 'react-icons/pi';
import { AiOutlineHome } from 'react-icons/ai';
import { RiCarLine } from 'react-icons/ri';
import { BiDumbbell, BiFork } from 'react-icons/bi';
import { IoBagOutline } from 'react-icons/io5';
import { MdBusinessCenter } from 'react-icons/md';
import { TbBabyCarriage } from 'react-icons/tb';

const ChooseCat: React.FC<{
  chooseCategory: (_id: string) => void;
}> = ({ chooseCategory }) => {
  const [name, setName] = useState<string>('seçmək');
  const [catego, setCatego] = useState<category[]>();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);

  useEffect(() => {
    axios.get(`${url}/category/getCategories`).then(({ data }) => {
      if (data.status === 'success') setCatego(data.categories);
    });
  }, []);

  return (
    <>
      <button
        onClick={handleOpen}
        type='button'
        className='block border-primary/50 border-2 px-3 py-2 rounded-lg text-sm bg-primary/20 text-blue-900 hover:bg-primary/70 hover:text-white'
      >
        {name}
      </button>
      <Dialog
        open={open}
        handler={handleOpen}
        className='p-4 grid grid-cols-2 sm:grid-cols-4 grid-rows-3 text-center gap-2 items-stretch'
      >
        {catego?.map((cat) => {
          let icon;
          switch (cat.icon) {
            case 'LuCable': {
              icon = <LuCable size={20} />;
              break;
            }
            case 'LuSofa': {
              icon = <LuSofa size={20} />;
              break;
            }
            case 'PiPlantLight': {
              icon = <PiPlantLight size={20} />;
              break;
            }
            case 'PiTShirtLight': {
              icon = <PiTShirtLight size={20} />;
              break;
            }
            case 'AiOutlineHome': {
              icon = <AiOutlineHome size={20} />;
              break;
            }
            case 'RiCarLine': {
              icon = <RiCarLine size={20} />;
              break;
            }
            case 'BiDumbbell': {
              icon = <BiDumbbell size={20} />;
              break;
            }
            case 'IoBagOutline': {
              icon = <IoBagOutline size={20} />;
              break;
            }
            case 'BiFork': {
              icon = <BiFork size={25} />;
              break;
            }
            case 'PiDog': {
              icon = <PiDog size={25} />;
              break;
            }
            case 'MdBusinessCenter': {
              icon = <MdBusinessCenter size={25} />;
              break;
            }
            case 'TbBabyCarriage': {
              icon = <TbBabyCarriage size={25} />;
              break;
            }
            case 'PiFirstAidKitLight': {
              icon = <PiFirstAidKitLight size={25} />;
              break;
            }
          }
          return (
            <div
              className='flex flex-col items-center hover:bg-gray-300 py-4 gap-2 justify-center rounded-lg cursor-pointer'
              key={cat._id}
              onClick={() => {
                chooseCategory(cat._id);
                setName(cat.type);
                handleOpen();
              }}
            >
              {icon}
              <p>{cat.type}</p>
            </div>
          );
        })}
      </Dialog>
    </>
  );
};

export default ChooseCat;
