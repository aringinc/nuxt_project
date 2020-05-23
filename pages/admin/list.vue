<template>
  <el-table :data="posts" style="width: 100%;">
    <el-table-column prop="title" label="Title" />
    <el-table-column label="Date">
      <template slot-scope="{ row: { date } }">
        <i class="el-icon-time"></i>
        <span style="margin-left: 10px;">{{
          new Date(date).toLocaleString()
        }}</span>
      </template>
    </el-table-column>
    <el-table-column label="Views">
      <template slot-scope="{ row: { views } }">
        <i class="el-icon-view"></i>
        <span style="margin-left: 10px;">{{ views }}</span>
      </template>
    </el-table-column>
    <el-table-column label="Comments">
      <template slot-scope="{ row: { comments } }">
        <i class="el-icon-message"></i>
        <span style="margin-left: 10px;">{{ comments.length }}</span>
      </template>
    </el-table-column>
    <el-table-column label="Operations">
      <template slot-scope="{ row }">
        <el-tooltip effect="dark" content="Edit" placement="top">
          <el-button
            icon="el-icon-edit"
            type="primary"
            circle
            @click="open(row._id)"
          />
        </el-tooltip>
        <el-tooltip effect="dark" content="Remove" placement="top">
          <el-button
            icon="el-icon-delete"
            type="danger"
            circle
            @click="remove(row._id)"
          />
        </el-tooltip>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  layout: 'admin',
  middleware: ['admin-auth'],
  async asyncData({ store }) {
    const posts = await store.dispatch('post/fetchAdminItems');
    return { posts };
  },
  methods: {
    open(id) {
      this.$router.push(`/admin/post/${id}`);
    },
    async remove(id) {
      try {
        await this.$confirm(
          'The post will be deleted. Are you sure?',
          'Warning',
          {
            confirmButtonText: 'Yes',
            cancelButtonText: 'Cancel',
            type: 'warning',
          }
        );
        await this.$store.dispatch('post/remove', id);
        this.posts = this.posts.filter((p) => p._id !== id);
        this.$message.success('Post was deleted.');
      } catch (e) {
        console.log('Canceled');
      }
    },
  },
};
</script>
