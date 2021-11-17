export const hub = () => {
  window.open('https://hub.jianmu.dev', '_blank');
};
export const contribution = () => {
  window.open('https://gitee.com/jianmu-dev/jianmu-ci-server', '_blank');
};
export const quickStart = () => {
  window.open('https://docs.jianmu.dev/guide/quick-start.html', '_blank');
};
export const doc = () => {
  window.open('https://docs.jianmu.dev/guide/index.html', '_blank');
};
export const example = () => {
  window.open('https://ci.jianmu.dev', '_blank');
};
// 能够展示出两根卷轴时的最小屏幕可视高度
export const minShowScrollHeight = 693;
// 卷轴能够滚动的高度
export const canScrollHeight = 4855;
export const dsl =
  'pipeline:\n' +
  '  name: 建木官网CDN CI/CD\n' +
  '  description: 建木官网CDN CI/CD\n' +
  '  git_clone:\n' +
  '    type: git_clone:1.0.0\n' +
  '    param:\n' +
  '      remote_url: https://gitee.com/jianmu-dev/jianmu-official-site.git\n' +
  '      ref: refs/heads/master\n' +
  '      netrc_machine: gitee.com\n' +
  '      netrc_username: ((gitee.username))\n' +
  '      netrc_password: ((gitee.password))\n' +
  '  node_build:\n' +
  '    type: nodejs_build:1.0.0-14.16.1\n' +
  '    param:\n' +
  '      workspace: ${git_clone.git_path}\n' +
  '      build_arg: --mode cdn\n' +
  '  qiniu_upload:\n' +
  '    type: qiniu_upload:1.0.1\n' +
  '    param:\n' +
  '      qiniu_bucket: jianmu\n' +
  '      qiniu_ak: ((qiniu.AccessKey))\n' +
  '      qiniu_sk: ((qiniu.SecretKey))\n' +
  '      qiniu_zone: z1\n' +
  '      qiniu_upload_uri_prefix: ${node_build.package_name}/${node_build.package_version}\n' +
  '      qiniu_upload_dir: ${git_clone.git_path}/dist\n' +
  '  update_index_page:\n' +
  '    type: scp_resouce:1.0.0\n' +
  '    param:\n' +
  '      ssh_private_key: ((private_key.alixg))\n' +
  '      ssh_ip: 47.243.164.48\n' +
  '      remote_file: /etc/nginx/html/index.html\n' +
  '      local_file: ${git_clone.git_path}/dist/index.html\n' +
  '  send_message:\n' +
  '    type: qywx_notice:1.0.0\n' +
  '    param:\n' +
  '      bot_webhook_url: ((charbot.webhook_url))\n' +
  '      mentioned_moblie_list: "[]"\n' +
  '      text_content: "建木官网CDN更新完成\\\\n\\\\n版本：${node_build.package_version}"\n' +
  '      msgtype: "text"\n' +
  '      mentioned_list: "[]"';
export const workFlow =
  'workflow:\n' +
  '  name: 建木官网CDN CI/CD\n' +
  '  description: 建木官网CDN CI/CD\n' +
  '  start:\n' +
  '    type: start\n' +
  '    targets:\n' +
  '      - git_clone\n' +
  '  git_clone:\n' +
  '    type: git_clone:1.0.0\n' +
  '    sources:\n' +
  '      - start\n' +
  '    targets:\n' +
  '      - node_build\n' +
  '    param:\n' +
  '      remote_url: https://gitee.com/jianmu-dev/jianmu-official-site.git\n' +
  '      ref: refs/heads/master\n' +
  '      netrc_machine: gitee.com\n' +
  '      netrc_username: ((gitee.username))\n' +
  '      netrc_password: ((gitee.password))\n' +
  '  node_build:\n' +
  '    type: nodejs_build:1.0.0-14.16.1\n' +
  '    sources:\n' +
  '      - git_clone\n' +
  '    targets:\n' +
  '      - qiniu_upload\n' +
  '    param:\n' +
  '      workspace: ${git_clone.git_path}\n' +
  '      build_arg: --mode cdn\n' +
  '  qiniu_upload:\n' +
  '    type: qiniu_upload:1.0.1\n' +
  '    sources:\n' +
  '      - node_build\n' +
  '    targets:\n' +
  '      - update_index_page\n' +
  '    param:\n' +
  '      qiniu_bucket: jianmu\n' +
  '      qiniu_ak: ((qiniu.AccessKey))\n' +
  '      qiniu_sk: ((qiniu.SecretKey))\n' +
  '      qiniu_zone: z1\n' +
  '      qiniu_upload_uri_prefix: ${node_build.package_name}/${node_build.package_version}\n' +
  '      qiniu_upload_dir: ${git_clone.git_path}/dist\n' +
  '  update_index_page:\n' +
  '    type: scp_resouce:1.0.0\n' +
  '    sources:\n' +
  '      - qiniu_upload\n' +
  '    targets:\n' +
  '      - send_message\n' +
  '    param:\n' +
  '      ssh_private_key: ((private_key.alixg))\n' +
  '      ssh_ip: 47.243.164.48\n' +
  '      remote_file: /etc/nginx/html/index.html\n' +
  '      local_file: ${git_clone.git_path}/dist/index.html\n' +
  '  send_message:\n' +
  '    type: qywx_notice:1.0.0\n' +
  '    sources:\n' +
  '      - update_index_page\n' +
  '    targets:\n' +
  '      - end\n' +
  '    param:\n' +
  '      bot_webhook_url: ((charbot.webhook_url))\n' +
  '      mentioned_moblie_list: "[]"\n' +
  '      text_content: "建木官网CDN更新完成\\\\n\\\\n版本：${node_build.package_version}"\n' +
  '      msgtype: "text"\n' +
  '      mentioned_list: "[]"\n' +
  '  end:\n' +
  '    type: end\n' +
  '    sources:\n' +
  '      - send_message';
