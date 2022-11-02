import { useRef, useState } from 'react';
import { Main } from '../Main/Main';
import api from '../../utils/api';

function App() {
   const fileField = useRef({});
   const contentRef = useRef({});
   const processedRef = useRef({});
   const [file, setFile] = useState({});
   const [firstValue, setFirstValue] = useState(0);
   const [secondValue, setSecondValue] = useState(0);
   const [gasFootprint, setGasFootprint] = useState(0);
   const [us, setUs] = useState(0);
   const [usPas, setUsPas] = useState(0);
   const [coordinates, setCoordinates] = useState({ firstPoint: [0, 0], secondPoint: [0, 0]});
   const [settings, setSettings] = useState([55.751574, 37.573856])

   const onButtonClick = (evt) => {
      evt.preventDefault();
      const formData = new FormData();
      formData.append('file', file.files[0]);
      contentRef.current.classList.add('content_hidden');
      api.uploadFile(formData);
      processedRef.current.classList.remove('processed_hidden')
   }

   const handleProcessedButton = (evt) => {
      evt.preventDefault();
      const a = api.getData()
         .then((res) => {
            let usSum = 0;
            let usPasSum = 0;
            for (let i = firstValue - 8; i <= secondValue - 8; i++) {
               if (res[i].us) {
                  usSum += res[i].us;
               } else {
                  continue
               }
            }

            for (let j = firstValue - 8; j <= secondValue - 8; j++) {
               if (res[j].usPas) {
                  usPasSum += res[j].usPas;
               } else {
                  continue
               }
            }
            setGasFootprint(Math.abs(Math.ceil((res[firstValue - 8].distance - res[secondValue - 8].distance)*0.061)));
            setUs(Math.ceil(usSum));
            setUsPas(Math.floor(usPasSum));
            setCoordinates({ firstPoint: [res[firstValue - 8].latitude, res[firstValue - 8].longitude], secondPoint: [res[secondValue - 8].latitude, res[secondValue - 8].longitude]});
            setSettings([res[firstValue - 8].latitude, res[firstValue - 8].longitude])
         })
         .catch(e => console.log(e))
   }

   const onInputChange = (evt) => {
      setFile(evt.target);
      if (file) {
        fileField.current.removeAttribute('disabled');
      } else {
        fileField.current.setAttribute('disabled');
      }
   }

   const handleChangeFirst = (evt) => {
      setFirstValue(evt.target.value);
   }

   const handleChangeSecond = (evt) => {
      setSecondValue(evt.target.value);
   }

   const checkGramEnding = (number) => {
      let stringNumber = String(number);
      let numberLength = stringNumber.length;
      let lastNumber;
      if (numberLength === 1 || (numberLength > 1 && stringNumber[numberLength - 2] === '0')) {
         if (stringNumber[numberLength - 1] === 1) {
            return 'грамм';
         } else if (Number(stringNumber[numberLength - 1]) > 1 && Number(stringNumber[numberLength - 1]) < 5) {
            return 'грамма'
         } else if (stringNumber[numberLength - 2]) {
            return 'грамм'
         } else {
            return 'граммов'
         }
      } else if (stringNumber[numberLength - 2] === '1') {
         lastNumber = Number(stringNumber[numberLength - 1]);
         if (lastNumber === 0 || lastNumber === 1) {
            return 'грамм';
         } else {
            return 'граммов'
         }
      } else {
         lastNumber = Number(stringNumber[numberLength - 1]);
         if (lastNumber  === 1) {
            return 'грамм';
         } else if (lastNumber > 1 && lastNumber < 5) {
            return 'грамма'
         } else {
            return 'граммов'
         }
      }
    }

   return (
      <div className="App">
         <Main 
         onButtonClick={onButtonClick} 
         setFile={onInputChange} 
         fileField={fileField} 
         contentRef={contentRef} 
         processedRef={processedRef}
         handleChangeFirst={handleChangeFirst}
         handleChangeSecond={handleChangeSecond}
         handleProcessedButton={handleProcessedButton}
         us={us}
         usPas={usPas}
         gasFootprint={gasFootprint}
         checkGramEnding={checkGramEnding}
         coordinates={coordinates}
         settings={settings}
         />
      </div>
   );
}

export default App;
