<template>
  <div class="container" id="wrapper">
    <nav class="nav">
      <router-link :to="{ name: 'home' }">Home</router-link>
    </nav>
    <main id="app">
      <router-view :key="$route.fullPath"/>
    </main>
  </div>
</template>

<style lang="scss">
  // Colours
  $white:               #fff;
  $dark:                #22272b;

  $body-color:          $dark;
  $body-bg:             $white;

  // spacing

  $padding-x:           1rem;

  // fonts & type

  $html-font-size:      10px; // 1rem === 10px

  $font-weight-base:    400;
  $font-size-base:      1.6rem;
  $font-family-base:    Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif;
  
  $line-height-base:    1.5;

  // nav 

  $nav-margin-bottom:   70px;

  // container

  $container-max-width: 900px;

  // wrapper 

  $wrapper-padding-top: 30px;

  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  html { font-size: $html-font-size; }

  body {
    margin: 0;
    font-family: $font-family-base;
    font-size: $font-size-base;
    font-weight: $font-weight-base;
    line-height: $line-height-base;
    color: $body-color;
    background-color: $body-bg;
  }

  img,
  video {
    display: block;
    max-width: 100%;
  }

  .nav {
    margin-bottom: $nav-margin-bottom;
  }

  .container {
    width: 100%;
    max-width: $container-max-width;
    margin-right: auto;
    margin-left: auto;
  }

  #wrapper {
    padding-top: $wrapper-padding-top;
  }
</style>
