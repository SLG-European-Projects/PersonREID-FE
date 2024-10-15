import  { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


export function CreateGalleryWrapper() {
  const navigate = useNavigate();
  useEffect(() => {navigate('/select', { state: { mode: 'gallery' , dataList: null} });})
}