import java.util.*;

class maxSubarray {

    public int maxSubarray(int[] arr) {
        int max = Integer.MIN_VALUE;
        int currsum = 0;
        for (int i = 0; i < arr.length; i++) {
            currsum += arr[i];
            if (currsum > max) max = currsum;
            if (currsum < 0) currsum = 0;
        }
        return max;
    }

    public static void main(String[] args) {
        int[] arr = { -2, 1, -3, 4, -1, 2, 1, -5, 4 };
        maxSubarray ms = new maxSubarray();
        System.out.println("Maximum subArray sum is: " + ms.maxSubarray(arr));
    }
}
