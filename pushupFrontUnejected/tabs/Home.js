import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, } from 'react-native';
import { Camera, CameraType } from 'expo-camera';
import * as FaceDetector from 'expo-face-detector';
import { StatusBar } from 'expo-status-bar';
import * as Font from 'expo-font';
import { SafeAreaView } from 'react-native-safe-area-context';
import { clickProps } from 'react-native-web/dist/cjs/modules/forwardedProps';
import { useFocusEffect, useIsFocused, } from '@react-navigation/native';

function Map(value, min1, max1, min2, max2) {
  return min2 + (value - min1) * (max2 - min2) / (max1 - min1);
}

export default function Home(props) {

  const [type, setType] = useState(CameraType.front);
  const [faces, setFaces] = useState([]);
  const [faceWidth, setFaceWidth] = useState(0);
  const [MinWidth, setMinWidth] = useState(Dimensions.get('window').width * 2);
  const [MaxWidth, setMaxWidth] = useState(0);
  const [PushCount, setPushCount] = useState(0);
  const [PushUpState, setPushUpState] = useState(0);
  const [pushFlag, setPushFlag] = useState(false);
  const [trainingStarted, setTrainingStarted] = useState(false);

  const isFocused = useIsFocused();

  // const CameraReadyContext = props.route.params.context;


  setTimeout(() => {},1999);


  return (
    <View style={styles.container}>



      {isFocused ?
        < Camera style={styles.camera} type={type}

          // onFacesDetected={(f) => {
          // setFaces(f.faces)

          // if (f.faces.length > 0) {
          //   setFaceWidth(f.faces[0]?.bounds.size.width)

          //   if (MinWidth == 0) {
          //     setMinWidth(f.faces[0]?.bounds.size.width ?? Dimensions.get('window').width * 2)
          //   }
          //   else {
          //     if (MinWidth > f.faces[0]?.bounds.size.width) {
          //       setMinWidth(f.faces[0]?.bounds.size.width)
          //     }
          //   }

          //   if (MaxWidth == 0) {
          //     setMaxWidth(f.faces[0]?.bounds.size.width ?? 0)
          //   }
          //   else {
          //     if (MaxWidth < f.faces[0]?.bounds.size.width ?? 0) {
          //       setMaxWidth(f.faces[0]?.bounds.size.width)
          //     }
          //   }
          //   let pushUpState = Map(faceWidth, MinWidth, MaxWidth, 0, 1)

          //   setPushUpState(pushUpState < 0 || pushUpState > 1 ? 0.5 : pushUpState)

          //   if ((pushUpState > 0.6) && pushFlag === false) {
          //     setPushCount(PushCount + 1)
          //     setPushFlag(true)
          //   }
          //   else if (pushUpState < 0.4) {
          //     setPushFlag(false)
          //   }

          // }
        // }}
        // faceDetectorSettings={{
        //   mode: FaceDetector.FaceDetectorMode.accurate,
        //   detectLandmarks: FaceDetector.FaceDetectorLandmarks.none,
        //   runClassifications: FaceDetector.FaceDetectorClassifications.none,
        //   minDetectionInterval: 100,
        //   tracking: true,
        // }}
        ratio = "4:3" 
        />: null}


      {/* <View style={styles.PushUpContainer}>
          {faces.length > 0 ?
            <Text>{PushUpState.toFixed(2)}</Text>
            : <Text>NoFacesDetected</Text>}
          <Text style={styles.PushUpsCount}>{PushCount}</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              setPushCount(0)
              setMaxWidth(0)
              setMinWidth(Dimensions.get('screen').width * 2)
            }}>
            <Text style={styles.text}> Reset </Text>
          </TouchableOpacity>

        </View> */}

    </View>
  );




}


const styles = StyleSheet.create({
  container: {
    position: 'relative',
    width: '100%',
    height: '100%',
    backgroundColor: 'pink',
    alignItems: 'center',
    justifyContent: 'center',

  },
  camera: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').width / 3 * 4,
  },
  PushUpsCount: {
    fontSize: 50,
    fontFamily: 'MonumentBlack',
    color: 'black',

  },

  PushUpContainer: {
    position: 'absolute',
    backgroundColor: '#ffffff80',
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  LoadingText: {
    fontFamily: 'MonumentRegular',
    fontSize: 40,
    color: 'black',
  },
  button: {
    backgroundColor: '#fdf',
    padding: 10,
    borderRadius: 10,

  },

});