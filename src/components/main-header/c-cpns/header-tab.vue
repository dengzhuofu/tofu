<template>
  <div class="dynamic-navbar">
    <ul>
      <li
        v-for="nav in navList"
        :key="nav.path"
        :class="{ active: isActive(nav) }"
      >
        <router-link :to="nav.path">{{ nav.name }}</router-link>
        <button
          @click="removeNavItem(nav)"
          @mouseover="highlightNavItem(nav)"
          @mouseout="unhighlightNavItem(nav)"
        >
          ×
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
import { reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'

export default {
  name: 'DynamicNavbar',
  setup() {
    const router = useRouter()
    const navList = reactive([])

    function removeNavItem(nav) {
      const index = navList.indexOf(nav)
      if (index !== -1) {
        navList.splice(index, 1)
      }
    }

    function highlightNavItem(nav) {
      nav.highlighted = true
    }

    function unhighlightNavItem(nav) {
      nav.highlighted = false
    }

    function isActive(nav) {
      return router.currentRoute.value.path === nav.path
    }

    router.afterEach((to) => {
      const exists = navList.some((nav) => nav.path === to.path)
      if (!exists) {
        const navItem = {
          name: to.name,
          path: to.path,
          highlighted: false
        }
        navList.push(navItem)
      }
    })

    onMounted(() => {
      const savedNavList = JSON.parse(localStorage.getItem('navList'))
      if (savedNavList) {
        navList.push(...savedNavList)
      }
    })

    window.addEventListener('beforeunload', () => {
      const savedNavList = JSON.stringify(navList)
      localStorage.setItem('navList', savedNavList)
    })

    return {
      navList,
      removeNavItem,
      highlightNavItem,
      unhighlightNavItem,
      isActive
    }
  }
}
</script>

<style scoped>
.dynamic-navbar {
  width: 100%;
  background-color: transparent;
  padding: 10px;
}

.dynamic-navbar ul {
  list-style-type: none;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 10px;
}

.dynamic-navbar li {
  display: flex;
  align-items: center;
  padding: 5px;

  text-align: center;
  border-radius: 5px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2), 0 7px 6px rgba(0, 0, 0, 0.2);
  background-color: #fff;
}

.dynamic-navbar li.active {
  background-color: skyblue;
}

.dynamic-navbar button {
  margin-left: 5px;
  border: none;
  background-color: transparent;
  cursor: pointer;
}

.dynamic-navbar button:hover {
  color: red;
}

.dynamic-navbar li.active a {
  color: white;
}
</style>
