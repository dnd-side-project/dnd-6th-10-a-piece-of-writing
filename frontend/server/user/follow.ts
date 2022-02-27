import baxios, { RESPONSE_TYPE } from '@/server/axios/baxios'
import { loadProfile } from '@/server/user/profile'
import { UserInfo } from '@/type/user'

export const follow = async (userId: number): Promise<RESPONSE_TYPE> => {
  try {
    const result = await baxios.post(`/relation/follow/${userId}`)
    if (result.status === 200) {
      return { success: true, message: '팔로우 요청에 성공했습니다!' }
    }
  } catch (e: any) {
    if (e?.response?.status === 404) {
      return { success: false, message: '팔로우 요청에 실패했습니다!' }
    }
  }
  return { success: false, message: '오류가 발생했습니다!' }
}

export const unfollow = async (userId: number): Promise<RESPONSE_TYPE> => {
  try {
    const result = await baxios.delete(`/relation/follow/${userId}`)
    if (result.status === 200) {
      return { success: true, message: '언팔로우 요청에 성공했습니다!' }
    }
  } catch (e: any) {
    if (e?.response?.status === 404) {
      return { success: false, message: '언팔로우 요청에 실패했습니다!' }
    }
  }
  return { success: false, message: '오류가 발생했습니다!' }
}

export type FollowingsResultType = { followings: UserInfo[]; nickname: string }
export type FollowersResultType = { followers: UserInfo[]; nickname: string }

export const getFollowing = async (userId: number): Promise<RESPONSE_TYPE<FollowingsResultType>> => {
  try {
    const userInfoResult = await loadProfile(userId)
    if (!userInfoResult.success) return { success: false, message: '잘못된 유저입니다!' }
    const result = await baxios.get(`/member/follow/list/${userId}`)
    if (result.status === 200 && result.data?.data) {
      return {
        success: true,
        message: '팔로윙 로드 요청에 성공했습니다!',
        data: { nickname: userInfoResult.data.nickname, followings: result.data?.data },
      }
    }
  } catch (e: any) {
    if (e?.response?.status === 404) {
      return { success: false, message: '팔로윙 로드 요청에 실패했습니다!' }
    }
  }
  return { success: false, message: '오류가 발생했습니다!' }
}

export const getFollower = async (userId: number): Promise<RESPONSE_TYPE<FollowersResultType>> => {
  try {
    const userInfoResult = await loadProfile(userId)
    if (!userInfoResult.success) return { success: false, message: '잘못된 유저입니다!' }
    const result = await baxios.get(`/member/follower/list/${userId}`)
    if (result.status === 200 && result.data?.data) {
      return {
        success: true,
        message: '팔로우 로드 요청에 성공했습니다!',
        data: { nickname: userInfoResult.data.nickname, followers: result.data?.data },
      }
    }
  } catch (e: any) {
    if (e?.response?.status === 404) {
      return { success: false, message: '팔로우 로드 요청에 실패했습니다!' }
    }
  }
  return { success: false, message: '오류가 발생했습니다!' }
}
