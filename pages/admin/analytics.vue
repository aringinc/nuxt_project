<template>
  <div>
    <h1>Post Analytic</h1>
    <app-analytics-chart title="Views" :analyticsData="analytics.views" />
    <app-analytics-chart title="Comments" :analyticsData="analytics.comments" />
  </div>
</template>

<script>
/* eslint-disable import/no-unresolved */
import AppAnalyticsChart from '@/components/admin/AnalyticsChart';

export default {
  layout: 'admin',
  middleware: ['admin-auth'],
  head: { title: `Analytics | ${process.env.appName}` },
  async asyncData({ store }) {
    const analytics = await store.dispatch('post/getAnalytics');
    return { analytics };
  },
  components: { AppAnalyticsChart },
  mounted() {},
};
</script>
