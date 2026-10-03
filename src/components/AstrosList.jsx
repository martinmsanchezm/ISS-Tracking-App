import React, {useEffect, useState} from "react";
import {View, FlatList} from 'react-native';
import { Avatar, Card, Text } from 'react-native-paper';
import { Divider } from 'react-native-paper';
import AstrosPhoto from '../data/astrosPhoto.json';
import LoadingIndicator from "./LoadingIndicator";
const AstrosList = () =>{

    const [data, setData] = useState(null);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch('http://api.open-notify.org/astros.json'); // URL de la API
          const jsonData = await response.json();
          setData(jsonData);
        } catch (error) {
          console.error('Error al obtener los datos:', error);
        }
      };
  
      fetchData(); // Llama a la función fetchData cada vez que el componente se renderiza
    }, []); // El segundo argumento [] indica que useEffect se ejecutará solo una vez después del montaje inicial
  

    return (
        <View>
            {data?
                <FlatList style={{padding:5, margin:5, marginBottom:0}}
                data={data.people}
                ItemSeparatorComponent={() => <Divider style={{padding:1, margin:5}} />}
                renderItem={({item:data}) => (
                        <Card>
                            {AstrosPhoto.photos[data.name]?
                                <Card.Cover source={{ uri: AstrosPhoto.photos[data.name].url }} style={{height:500}} />
                                :
                                <Avatar.Icon size={160} icon="account" style={{alignSelf:'center', marginTop:20}} />
                            }
                            <Card.Content>
                                <Text style={{color:'green'}} variant="titleLarge">{data.name}</Text>
                            </Card.Content>
                        </Card>
                    )}
                    />
                :
                <LoadingIndicator />
            }
        </View>
    );
}

export default AstrosList;