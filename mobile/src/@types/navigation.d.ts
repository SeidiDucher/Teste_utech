export type RootStackParamList = {
    Home: undefined;
    Trivia: undefined;
    Resultado: undefined;
}

declare global {
    namespace ReactNavigation {
        interface RootParamList extends RootStackParamList {}
    }
}