import { ref, onMounted, onUnmounted } from '@vue/composition-api';

function useResize() {
  const windowInnerWidth = ref(0);
  const windowInnerHeight = ref(0);

  const update = () => {
    windowInnerWidth.value = window.innerWidth;
    windowInnerHeight.value = window.innerHeight;
  };

  // initialize
  update();

  onMounted(() => {
    window.addEventListener('resize', update);
  });

  onUnmounted(() => {
    window.removeEventListener('resize', update);
  });

  return { windowInnerWidth, windowInnerHeight };
}

export { useResize };
