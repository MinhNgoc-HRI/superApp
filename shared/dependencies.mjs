const deps = {
    react: {
      /**
       * singleton means that only one version of the module is loaded.
       */
      singleton: true,
      /**
       * eager means that the module is added into the initial bundle and will not be loaded later.
       * All shared module in the host app should be eager. In remote containers it depends on build proposes.
       * If bundle should work as a standalone application, then it should be eager.
       * Here is STANDALONE env variable shows if bundle is standalone and eager should be enabled.
       */
      eager: true,
      /**
       * requiredVersion is used to match requested modules in bundle.
       * It's recommended to use the same version as in the host app.
       */
      requiredVersion: "18.1.0",
    },
    "react-native": {
      singleton: true,
      eager: true,
      requiredVersion: "0.70.6",
    },
    "pmn-rn-component": {
      singleton: true,
      eager: true,
      requiredVersion: "^0.1.3",
    },
    "react-native-fast-image": {
      singleton: true,
      eager: true,
      requiredVersion: "^8.6.3",
    },
    "@react-navigation/native": {
      singleton: true,
      eager: true,
      requiredVersion: "^6.1.6",
    },
    "@react-navigation/native-stack": {
      singleton: true,
      eager: true,
      requiredVersion: "6.9.12",
    },
    "@react-navigation/material-bottom-tabs": {
      singleton: true,
      eager: true,
      requiredVersion: "6.2.15",
    },
    "react-native-paper": {
      singleton: true,
      eager: true,
      requiredVersion: "^5.9.1",
    },
    "@react-native-async-storage/async-storage": {
      singleton: true,
      eager: true,
      requiredVersion: "^1.17.11",
    },
    "react-native-safe-area-context": {
      singleton: true,
      eager: true,
      requiredVersion: "^4.5.3",
    },
    "react-native-screens": {
      singleton: true,
      eager: true,
      requiredVersion: "^3.21.0",
    },
    "react-native-tab-view": {
      singleton: true,
      eager: true,
      requiredVersion: "^3.5.2",
    },
    "react-native-vector-icons": {
      singleton: true,
      eager: true,
      requiredVersion: "^9.2.0",
    },
    "@react-navigation/bottom-tabs": {
      singleton: true,
      eager: true,
      requiredVersion: "^6.5.7",
    },
    "@react-navigation/material-top-tabs": {
      singleton: true,
      eager: true,
      requiredVersion: "^6.6.2",
    },
    "react-native-gesture-handler": {
      singleton: true,
      eager: true,
      requiredVersion: "2.9.0",
    },
    "react-native-reanimated": {
      singleton: true,
      eager: true,
      requiredVersion: "2.17.0",
    },
    "@react-navigation/drawer": {
      singleton: true,
      eager: true,
      requiredVersion: "^6.6.2",
    },
    "@react-navigation/stack": {
      singleton: true,
      eager: true,
      requiredVersion: "^6.3.16",
    },
    "react-native-keyboard-aware-scroll-view": {
      singleton: true,
      eager: true,
      requiredVersion: "^0.9.5",
    },
    "react-native-reanimated-carousel": {
      singleton: true,
      eager: true,
      requiredVersion: "3.4.0",
    },
    "react-native-svg": {
      singleton: true,
      eager: true,
      requiredVersion: "13.7.0",
    },
    "react-native-vector-icons": {
      singleton: true,
      eager: true,
      requiredVersion: "^9.2.0",
    },
    "@react-native-masked-view/masked-view": {
      singleton: true,
      eager: true,
      requiredVersion: "^0.2.9",
    },
    "react-native-portalize": {
      singleton: true,
      eager: true,
      requiredVersion: "^1.0.7",
    },
    "react-native-modalize": {
      singleton: true,
      eager: true,
      requiredVersion: "^2.1.1",
    },
    "react-native-pager-view": {
      singleton: true,
      eager: true,
      requiredVersion: "^6.2.0",
    },
  };
  
  export { deps };