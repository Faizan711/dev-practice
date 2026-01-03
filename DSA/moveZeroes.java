import java.util.*;

class moveZeroes {

    public void moveZeroes(int[] arr) {
        int s = 0,
            e = arr.length - 1;
        while (arr[e] == 0) {
            e--;
        }
        while (s < e) {
            if (arr[s] == 0) {
                while (e > s && arr[e] == 0) e--;
                if (e > s) {
                    int temp = arr[s];
                    arr[s] = arr[e];
                    arr[e] = temp;
                }
            }
            if (arr[s] != 0) s++;
        }
    }

    public static void main(String[] args) {
        int[] arr = { 0, 1, 0, 3, 12 };
        System.out.println("Array before: " + Arrays.toString(arr));
        moveZeroes mz = new moveZeroes();
        mz.moveZeroes(arr);
        System.out.println("Array after: " + Arrays.toString(arr));
    }
}
