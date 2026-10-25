export const getAvatarUrl = (email?: string | null) => {
  if (!email) return `https://api.dicebear.com/7.x/avataaars/svg?backgroundType=solid`;
  return `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}&backgroundColor=ffdfbf,ffd5dc,c0aede,bde4f8,b7e5dd&backgroundType=solid`;
};
