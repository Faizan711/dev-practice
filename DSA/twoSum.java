import java.util.*;

class twoSum {

    public boolean twoSum(int[] arr, int target) {
        for (int i = 0; i < arr.length; i++) {
            for (int j = 0; j < arr.length; j++) {
                if (i != j) {
                    if (arr[i] + arr[j] == target) return true;
                }
            }
        }
        return false;
    }

    public static void main(String[] args) {
        int[] arr = { 3, 28, 634, 50, 19, 44 };

        int target = 21;
        twoSum ts = new twoSum();
        if (ts.twoSum(arr, target)) {
            System.out.println("target found");
        } else {
            System.out.println("target not found");
        }
    }
}
