
'use client'
import GlobalContextProvider from "./context/theme";
import Main from "./main";

export default function Home() {
  return (
    <GlobalContextProvider>
      <main>
        <Main />
      </main>
    </GlobalContextProvider>
  );
}
