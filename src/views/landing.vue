<template>
  <div class="">
    <Navbar solid class="sticky top-0 left-0 z-30 px-5">
      <template #logo>
        <NavbarLogo link="https://www.google.com/" alt="Flowbite logo"
          image-url="https://flowbite.com/docs/images/logo.svg">
          Flowbite
        </NavbarLogo>
      </template>

      <template #default="{isShowMenu}">
        <NavbarCollapse :isShowMenu="isShowMenu">
          <NavbarLink isActive link="#">
            <RouterLink to="/about">
              Home
            </RouterLink>
          </NavbarLink>
          <NavbarLink link="#">Services</NavbarLink>
          <NavbarLink link="#">Pricing</NavbarLink>
          <NavbarLink link="#">Contact</NavbarLink>
        </NavbarCollapse>
      </template>
    </Navbar>

    <div class="min-h-screen px-5 flex flex-col space-y-5 md:px-14">
      <div class="banner pt-4 flex flex-col space-y-6 md:space-y-0 md:flex-row md:h-[70vh]">
        <div class="w-full flex flex-col space-y-6 justify-center mr-14 lg:pt-10 lg:w-[45%]">
          <div class="text-2xl font-semibold flex flex-col lg:space-y-2 md:text-3xl xl:text-5xl">
            <h1>Trust your health</h1>
            <h1>to the best specialist</h1>
          </div>

          <p class="text-justify">Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis sint illum,
            perferendis doloribus neque, odio nam ea asperiores iusto quam ipsum, repudiandae iste libero nulla officiis
            commodi quo ex repellat?</p>

          <RouterLink to="/">
            <Button class="flex flex-row" size="lg">
              Mulai sekarang
              <template #suffix >
                <svg aria-hidden="true" class="ml-2 -mr-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd"
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                    clip-rule="evenodd"></path>
                </svg>
              </template>
            </Button>
          </RouterLink>
        </div>

        <div class="w-full flex justify-center lg:w-[55%]">
          <img src="https://flowbite.s3.amazonaws.com/docs/jumbotron/conference.jpg" class="rounded-md h-full object-cover"
            alt="doctor image">
        </div>
      </div>

      <div class="">
        <h1>About us</h1>
  
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque at cumque ipsa, aspernatur laboriosam sequi, eveniet beatae hic delectus esse reprehenderit quod commodi? Quia inventore harum alias optio, dicta veniam.</p>
      </div> 
    </div>


    <footer class="bg-white rounded-lg shadow dark:bg-gray-900 w-full mt-10">
      <div class="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div class="sm:flex sm:items-center sm:justify-between">
          <RouterLink to="/" class="flex items-center mb-4 sm:mb-0">
            <img src="https://flowbite.com/docs/images/logo.svg" class="h-8 mr-3" alt="Flowbite Logo" />
            <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Flowbite</span>
          </RouterLink>
          <ul class="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
            <li>
              <a href="#" class="mr-4 hover:underline md:mr-6 ">About</a>
            </li>
            <li>
              <a href="#" class="mr-4 hover:underline md:mr-6">Privacy Policy</a>
            </li>
            <li>
              <a href="#" class="mr-4 hover:underline md:mr-6 ">Licensing</a>
            </li>
            <li>
              <a href="#" class="hover:underline">Contact</a>
            </li>
          </ul>
        </div>
        <hr class="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <span class="block text-sm text-gray-500 sm:text-center dark:text-gray-400">© {{ year }} <RouterLink to="/" class="hover:underline">Toddler™</RouterLink>. All Rights Reserved.</span>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
  import {
    Navbar,
    NavbarLogo,
    NavbarCollapse,
    NavbarLink,
    Button,
  } from 'flowbite-vue';
  import { onMounted, ref } from 'vue';

  const year= ref(0)

  onMounted(()=> {
    year.value= new Date().getFullYear()
  })
</script>