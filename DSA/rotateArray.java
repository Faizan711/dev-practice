import java.util.*;

class rotateArray {

    public void rotateArray(int[] arr, int steps) {
        int n = arr.length;
        steps = steps % n;

        reverse(arr, 0, n - 1);
        reverse(arr, 0, steps - 1);
        reverse(arr, steps, n - 1);
    }

    public void reverse(int[] arr, int start, int end) {
        while (start < end) {
            int temp = arr[start];
            arr[start] = arr[end];
            arr[end] = temp;
            start++;
            end--;
        }
    }

    public static void main(String[] args) {
        int[] arr = { 1, 2, 3, 4, 5, 6, 7 };
        System.out.println("Array before: " + Arrays.toString(arr));
        rotateArray ra = new rotateArray();
        int steps = 3;
        ra.rotateArray(arr, steps);
        System.out.println("Array after: " + Arrays.toString(arr));
    }
}
