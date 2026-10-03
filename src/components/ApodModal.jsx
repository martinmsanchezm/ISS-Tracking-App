import React, {useEffect, useState} from 'react';
import { connect } from 'react-redux'
import { ScrollView } from 'react-native';
import { Modal, Text, Card } from 'react-native-paper';
import { setApodModal } from '../redux/actions/Apod';
import LoadingIndicator from './LoadingIndicator';
const ApodModal = ({showApod, setApodModal}) => {

    const [data, setData] = useState(null);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY'); // URL de la API
          const jsonData = await response.json();
          setData(jsonData);
        } catch (error) {
          console.error('Error al obtener los datos:', error);
        }
      };
  
      fetchData(); // Llama a la función fetchData cada vez que el componente se renderiza
    }, []); // El segundo argumento [] indica que useEffect se ejecutará solo una vez después del montaje inicial
  

    return (
        <Modal visible={showApod}
            onDismiss={()=>setApodModal()} 
            contentContainerStyle={{backgroundColor: 'transparent', padding: 20}}>
            {data?
              <ScrollView>
                  <Card>
                      <Card.Cover source={{ uri: data.url}} style={{height:500}} />
                      <Card.Content>
                          <Text style={{color:'black'}} variant="titleLarge">{data.title}</Text>
                          <Text style={{color:'green'}} variant="titleSmall">{data.date}</Text>
                          {data.copyright?
                            <Text style={{color:'green'}} variant="titleSmall">{data.copyright.replace('\n', '')}</Text>
                            :
                            null
                          }
                          <Text style={{color:'green'}} variant="titleMedium">{data.explanation}</Text>
                      </Card.Content>
                  </Card>
              </ScrollView>
              :
              <LoadingIndicator />
            }
        </Modal>
    );
};


const mapStateToProps = state => ({
    showApod: state.Apod.showApod,
})

export default connect(mapStateToProps,{
    setApodModal
})(ApodModal)
