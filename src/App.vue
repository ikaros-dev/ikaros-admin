<script setup lang="ts">

</script>

<template>
  <div class="container">
      <el-container class="admin-layout">
        <el-aside width="200px" class="aside">
          <dev class="logo"></dev>
          Aside
        </el-aside>
        <el-container>
          <el-header class="header">Header</el-header>
          <el-main class="main">
            <dev>
              <el-breadcrumb separator="/">
              <el-breadcrumb-item :to="{ path: '/' }">homepage</el-breadcrumb-item>
            </el-breadcrumb>
            
            </dev>
            
            <dev class="content">
              <RouterView />
            </dev>
          </el-main>
        </el-container>
      </el-container>
    </div>
</template>

<style lang="scss" scoped>
.container {
  padding: 0;
  margin: 0;
  height: 100%;
}

.admin-layout {
  height: 100%;


  .aside {

    .logo {
      position: relative;
      text-align: center;
      height: 64px;
      overflow: hidden;
      line-height: 64px;
    }
    
    width: 200px;
    background-color: #d1e9ff;

  }

  .header {
    height: 64px;
    position: relative;
    background-color: #fff;
    box-shadow: 0 1px 4px rgb(0 21 41 / 8%);
  }

  .main {
    background-color: #fff;


  }
}

</style>
