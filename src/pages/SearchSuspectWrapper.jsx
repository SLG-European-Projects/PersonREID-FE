import  { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


export function SearchSuspectWrapper() {
  const navigate = useNavigate();
  useEffect(() => {navigate('/select', { state: { mode: 'individual-videos' , dataList: null} });})
}