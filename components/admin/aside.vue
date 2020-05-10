<template>
  <el-menu router :style="{ height: '100%' }" :default-active="$route.path">
    <el-menu-item index="/admin/analytics">
      <i class="el-icon-info"></i>
      <span>Analytics</span>
    </el-menu-item>
    <el-menu-item index="/admin/create">
      <i class="el-icon-edit-outline"></i>
      <span>Create a post</span>
    </el-menu-item>
    <el-menu-item index="/admin/list">
      <i class="el-icon-tickets"></i>
      <span>List posts</span>
    </el-menu-item>
    <el-menu-item index="/admin/user">
      <i class="el-icon-service"></i>
      <span>Users</span>
    </el-menu-item>
    <el-menu-item index="/admin/logout">
      <i class="el-icon-close"></i>
      <span>Logout</span>
    </el-menu-item>
  </el-menu>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped></style>
